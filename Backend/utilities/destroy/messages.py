import sys
from foodtruck.database import Session
from foodtruck.model import Messages, Menu_Items
from pprint import pprint

# TODO find out how to reset TID autoincrement value
def delete():
    Messages.query.delete()
    Session.commit()

    messages = Messages.query.all()
    if len(messages) == 0:
        print('[SUCCESS]')
    else:
        print('[ERROR]')
        pprint([x.asdict() for x in messages])

if __name__ == '__main__':
    delete()
