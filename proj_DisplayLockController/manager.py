# Kafka imports
import asyncio
from aiokafka import AIOKafkaConsumer

# Display imports
import drivers
from time import sleep
from datetime import datetime

class Manager:
    def __init__(self, url, topic, id):
        self.display = Display()
        self.consumer = AIOKafkaConsumer(
            topic,
            bootstrap_servers=url,
            group_id="mygroup",
        )
        self.id = id
        self.max_number = 20

    async def start(self):
        await self.consumer.start()
        display_message("Hello World!", "Good Morning!")
        while True:
            async for msg in self.consumer:
                res = eval(msg.value)
                if res["id"] == self.id:
                    number_count = res["number_count"]
                    locked = number_count >= self.max_number
                    locked_str = "Locked" if locked else "Unlocked"
                    self.display.display_message(f"{number_count}/{self.max_number}".center(16), locked_str.center(16))

    
    async def stop(self):
        await self.consumer.stop()
    
class Display:
    def __init__(self):
        self.display = drivers.Lcd()

    def display_message(self, fline, lline):
        self.display.lcd_display_string(fline, 1)
        self.display.lcd_display_string(lline, 2)


async def main():
    manager = Manager("localhost:29092", "events", 1)
    try:
        await manager.start()
    except KeyboardInterrupt:
        await manager.stop()

if __name__ == "__main__":
    asyncio.run(main())