"""
Class to abstract the Kafka client, offering standardized methods to publish data to Kafka.
"""

import json
import logging
from typing import Any, Dict, List, Optional, Union

from confluent_kafka import Producer

logging.basicConfig(level=logging.INFO)  # or DEBUG if you want to see everything
logger = logging.getLogger(__name__)


class KafkaClient:
    def __init__(self, kafka_url: str, kafka_topic: str):
        self.kafka_url = kafka_url
        self.kafka_topic = kafka_topic
        self.producer = Producer({"bootstrap.servers": self.kafka_url})

    def publish(self, data: Union[Dict, List[Dict]]) -> None:
        """
        Publishes data to Kafka.
        """
        if isinstance(data, dict):
            data = [data]

        for message in data:
            self.producer.produce(
                self.kafka_topic, json.dumps(message), callback=_report
            )
            self.producer.flush()


def _report(err, msg):
    """
    Reports errors encountered during message production or
    delivery. Called once for each message.
    """
    if err is not None:
        logger.error(f"Message delivery failed: {err}")
    else:
        logger.info(f"Message delivered to {msg.topic()} [{msg.partition()}]")
