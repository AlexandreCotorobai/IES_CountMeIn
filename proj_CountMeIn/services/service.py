from confluent_kafka import Consumer
from confluent_kafka.admin import AdminClient, NewTopic
from pymongo import MongoClient
import json
import time

# Loop until Kafka is ready
while True:
    try:
        admin_client = AdminClient({
            "bootstrap.servers": "localhost:29092"
            })
        topics = admin_client.list_topics(timeout=5).topics
        break
    except Exception as e:
        print("Waiting for Kafka to become available...")
        time.sleep(10)


if "countmein" not in topics:
    new_topics = [NewTopic("countmein", 1, 1)]
    admin_client.create_topics(new_topics)

consumer = Consumer({
    'bootstrap.servers': 'localhost:29092',
    'group.id': 'mygroup',
    'auto.offset.reset': 'earliest'
})

client = MongoClient('mongodb://localhost:27017/')
db = client['events']
collection = db['data']

consumer.subscribe(['countmein'])

while True:
    msg = consumer.poll(1.0)
    # print(msg)
    if msg is None:
        continue
    if msg.error():
        print("Consumer error: {}".format(msg.error()))
        continue

    msg_value = msg.value().decode('utf-8').strip()
    # print(msg_value)
    if msg_value:  # Check if the message value is not empty
        data = json.loads(msg_value)
        collection.insert_one(data)