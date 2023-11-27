import psycopg2

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="192.168.1.185",
    port="5432",
    user="postgres",
    password="postgres",
    database="countmein"
)

# Create a cursor object
cursor = conn.cursor()

# SQL statement to create a table
create_table_query = '''
    CREATE TABLE admins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100)
    );
'''

# SQL statement to insert an admin
insert_admin_query = '''
    INSERT INTO admins (name, email, password) VALUES (%s, %s, %s) RETURNING id;
'''

# Admin data (replace with actual data)
admin_data = ('Admin Name', 'admin@example.com', 'admin_password')

# Execute the SQL statements
cursor.execute(create_table_query)
cursor.execute(insert_admin_query, admin_data)

# Commit the changes
conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()

