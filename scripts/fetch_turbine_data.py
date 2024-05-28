import os
import csv
import asyncio
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv('MONGO_URL') 

client = AsyncIOMotorClient(MONGO_URL)
database = client["data"]
turbine_collection = database["turbine"]

async def fetch_and_insert_data(file_name, file_path):
    data = []

    with open(file_path, mode='r',encoding='utf-8-sig') as file:
        csv_reader = csv.DictReader(file, delimiter=';',skipinitialspace='true')
        header_measurement = next(csv_reader)

        for row in csv_reader:
            record = {"turbine_id": file_name}
            for key, value in row.items():
                trimmed_key = key.replace(" ","").rstrip('-')
                # if value has measurement, add unit field
                if header_measurement[key]:
                    record[trimmed_key] = {
                        'unit' : header_measurement[key],
                        'value': float(value.replace(",","."))
                    }
                elif key == 'Dat/Zeit':
                    date = datetime.strptime(value, '%d.%m.%Y, %H:%M')
                    record[trimmed_key] = date
                else:
                    record[trimmed_key] = value
            data.append(record)
    result = await turbine_collection.insert_many(data)

async def get_all_files(input_dir):
    for file_name in os.listdir(input_dir):
        [name, extension] = os.path.splitext(file_name)
        
        if extension == ".csv":
            file_path = os.path.join(input_dir, file_name)
            await fetch_and_insert_data(name, file_path)

if __name__ == "__main__":
    input_dir = "./data/input/"
    asyncio.run(get_all_files(input_dir)) 