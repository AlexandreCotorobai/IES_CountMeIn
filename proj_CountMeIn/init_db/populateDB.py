import psycopg2

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="db_pg",
    port="5432",
    user="postgres",
    password="postgres",
    database="countmein"
)

# Create a cursor object
cursor = conn.cursor()

# SQL statement to drop the tables if they exist
drop_tables_query = '''
    DROP TABLE IF EXISTS salas CASCADE;
    DROP TABLE IF EXISTS admins_salas CASCADE;
    DROP TABLE IF EXISTS admins CASCADE;
'''

# SQL statement to create the admins table
create_admins_table_query = '''
    CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100)
    );
'''

# SQL statement to create the salas table
create_salas_table_query = '''
    CREATE TABLE IF NOT EXISTS salas (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER REFERENCES admins(id),
        name VARCHAR(100),
        address VARCHAR(100),
        capacity INTEGER,
        locked BOOLEAN DEFAULT FALSE
    );
'''

# Admin data (replace with actual data)
admin_data = ('Admin Name', 'admin@example.com', '{bcrypt}$2a$10$3Y4.jSJPvhGHgBAafzPUHOMxfH0xKk1P2.JdF//2W.Ij0g8ZSKWLW') #Admin_example1

# Execute the SQL statements
cursor.execute(drop_tables_query)
cursor.execute(create_admins_table_query)
cursor.execute(create_salas_table_query)
cursor.execute("INSERT INTO admins (name, email, password) VALUES (%s, %s, %s) RETURNING id;", admin_data)
admin_id = cursor.fetchone()[0]

# Sala data (replace with actual data)
sala_data = (admin_id, 'Sala 1', 'Local A', 50, False)

# Execute the SQL statements
cursor.execute("INSERT INTO salas (admin_id, name, address, capacity, locked) VALUES (%s, %s, %s, %s, %s) RETURNING id;", sala_data)

# Commit the changes
conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()

