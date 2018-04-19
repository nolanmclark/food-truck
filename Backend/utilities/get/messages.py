import sys
from foodtruck.database import Session
from foodtruck.model import Messages
from pprint import pprint

def get():
    messages = Messages.query.all()
    pprint([x.asdict() for x in messages])

if __name__ == '__main__':
    get()
