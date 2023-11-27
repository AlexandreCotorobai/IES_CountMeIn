from confluent_kafka import Consumer
from confluent_kafka.admin import AdminClient, NewTopic
from pymongo import MongoClient
import json


admin_client = AdminClient({
    "bootstrap.servers": "kafka:9092"
})

new_topic = NewTopic(
    name="saveinmongo",  # The name of the new topic
    num_partitions=1,  # Number of partitions
    replication_factor=1  # Number of replicas
)

admin_client.create_topics([new_topic])

consumer = Consumer({
    'bootstrap.servers': 'kafka:9092',
    'group.id': 'mygroup',
    'auto.offset.reset': 'earliest'
})

client = MongoClient('mongodb://mongo:27017/')
db = client['countmein']
collection = db['data']

consumer.subscribe(['saveinmongo'])

while True:
    msg = consumer.poll(1.0)
    # print(msg)
    if msg is None:
        continue
    if msg.error():
        print("Consumer error: {}".format(msg.error()))
        continue

    data = json.loads(msg.value().decode('utf-8'))
    collection.insert_one(data)