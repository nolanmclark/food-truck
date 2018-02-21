from database import Session
from model import *
import json

def all_trucks():
    trucks = [x.asdict() for x in Trucks.query.all()]
    return json.dumps(trucks)
