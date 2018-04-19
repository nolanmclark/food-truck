import sys
from foodtruck.database import Session
from foodtruck.model import Menu_Items
from pprint import pprint

# TODO find out how to reset TID autoincrement value
def delete():
    Menu_Items.query.delete()
    Session.commit()

    m_items = Menu_Items.query.all()
    if len(m_items) == 0:
        print('[SUCCESS]')
    else:
        print('[ERROR]')
        pprint([x.asdict() for x in m_items])

if __name__ == '__main__':
    delete()
