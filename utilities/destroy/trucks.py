from foodtruck.database import Session
from foodtruck.model import Trucks
from pprint import pprint

# TODO find out how to reset TID autoincrement value
def delete():
    Trucks.query.delete()
    Session.commit()

    trucks = Trucks.query.all()
    if len(trucks) == 0:
        print('[SUCCESS]')
    else:
        print('[ERROR]')
        pprint([x.asdict() for x in trucks])

if __name__ == '__main__':
    delete()
