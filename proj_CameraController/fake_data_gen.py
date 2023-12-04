import argparse
import random
import time
from kafka_client import KafkaClient


def generate_message(user_id, room_id, room_coords):
    return {"user_id": user_id, "room_id": room_id, "room_count": len(room_coords)}


def generate_room_coords():
    # choose random number between 1 and 15
    n_points = random.randint(1, 15)
    # generate n_points random coordinates
    room_coords = []
    for _ in range(n_points):
        x = random.randint(0, 100)
        y = random.randint(0, 100)
        room_coords.append((x, y))

    return room_coords


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate fake data for Kafka")
    parser.add_argument(
        "--kafka-url",
        type=str,
        default="localhost:29092",
        help="URL for Kafka server",
    )
    parser.add_argument(
        "--kafka-topic",
        type=str,
        default="test",
        help="Topic to publish to",
    )
    parser.add_argument(
        "--interval",
        type=int,
        default=5,
        help="Interval between messages (in seconds)",
    )
    parser.add_argument(
        "--user-id",
        type=int,
        default=1,
        help="User ID to generate data for",
    )
    parser.add_argument(
        "--room-id",
        type=int,
        default=1,
        help="Room ID to generate data for",
    )

    args = parser.parse_args()

    def main():
        producer = KafkaClient(args.kafka_url, args.kafka_topic)
        while True:
            room_coords = generate_room_coords()
            message = generate_message(args.user_id, args.room_id, room_coords)
            producer.publish(data=message)
            time.sleep(args.interval)

    main()
