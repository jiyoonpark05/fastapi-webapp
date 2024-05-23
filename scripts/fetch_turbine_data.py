import os
import csv
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv('MONGO_URL') 

client = AsyncIOMotorClient(MONGO_URL)
database = client["data"]
turbine_collection = database["turbine"]

async def fetch_and_insert_data(file_path):
    data = []

    with open(file_path, mode='r',encoding='utf-8-sig') as file:
        csv_reader = csv.DictReader(file, delimiter=';',skipinitialspace='true')
        header_measurement = next(csv_reader)

        for row in csv_reader:
            record = {}
            for key, value in row.items():
                # if value has measurement, add unit field
                if header_measurement[key]:
                    record[key] = {
                        'unit' : header_measurement[key],
                        'value': value
                    }
                else:
                    record[key] = value
            data.append(record)
    result = await turbine_collection.insert_many(data)

async def get_all_files(input_dir):
    for filename in os.listdir(input_dir):
        if filename.endswith(".csv"):
            file_path = os.path.join(input_dir, filename)
            await fetch_and_insert_data(file_path)

if __name__ == "__main__":
    input_dir = "./data/input/"
    asyncio.run(get_all_files(input_dir))