from confluent_kafka import Consumer
from pymongo import MongoClient
import json

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
consumer.subscribe(['your_topic'])

# Process messages
while True:
    msg = consumer.poll(1.0)

    if msg is None:
        continue
    if msg.error():
        print("Consumer error: {}".format(msg.error()))
        continue

    # Parse the message value from JSON and insert it into MongoDB
    data = json.loads(msg.value().decode('utf-8'))
    collection.insert_one(data)