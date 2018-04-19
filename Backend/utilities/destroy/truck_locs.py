from foodtruck.database import Session
from foodtruck.model import Truck_Locs
from pprint import pprint

# TODO find out how to reset TID autoincrement value
def delete():
    Truck_Locs.query.delete()
    Session.commit()

    locs = Truck_Locs.query.all()
    if len(locs) == 0:
        print('[SUCCESS]')
    else:
        print('[ERROR]')
        pprint([x.asdict() for x in locs])

if __name__ == '__main__':
    delete()
