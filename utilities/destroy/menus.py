import sys
from foodtruck.database import Session
from foodtruck.model import Menus, Menu_Items
from pprint import pprint

# TODO find out how to reset TID autoincrement value
def delete():
    m_items = [x.asdict() for x in Menu_Items.query.all()]
    if len(m_items) > 0:
        print('Clear Menu_Items first.')
        sys.exit(1)
    
    Menus.query.delete()
    Session.commit()

    menus = Menus.query.all()
    if len(menus) == 0:
        print('[SUCCESS]')
    else:
        print('[ERROR]')
        pprint([x.asdict() for x in menus])

if __name__ == '__main__':
    delete()
