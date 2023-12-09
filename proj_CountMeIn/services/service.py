from confluent_kafka import Consumer
from confluent_kafka.admin import AdminClient, NewTopic
from pymongo import MongoClient
import json


# Create an instance of the AdminClient
admin_client = AdminClient({
    "bootstrap.servers": "kafka:9092"
})

# Define the new topic
new_topic = NewTopic(
    name="saveinmongo",  # The name of the new topic
    num_partitions=1,  # Number of partitions
    replication_factor=1  # Number of replicas
)

# Create the new topic
admin_client.create_topics([new_topic])

 # Create a Kafka consumer
consumer = Consumer({
    'bootstrap.servers': 'kafka:9092',
    'group.id': 'mygroup',
    'auto.offset.reset': 'earliest'
})

# Connect to MongoDB
client = MongoClient('mongodb://mongo:27017/')
db = client['countmein']
collection = db['data']

# Subscribe to the topic
consumer.subscribe(['saveinmongo'])

# Process messages
while True:
    msg = consumer.poll(1.0)
    print(msg)
    if msg is None:
        continue
    if msg.error():
        print("Consumer error: {}".format(msg.error()))
        continue

    # Parse the message value from JSON and insert it into MongoDB
    data = json.loads(msg.value().decode('utf-8'))
    collection.insert_one(data)