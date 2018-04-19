import sys
from foodtruck.database import Session
from foodtruck.model import Trucks, Truck_Locs
from pprint import pprint

def build():
    truck_ids = [x.tid for x in Trucks.query.all()]

    locs = []
    locs.append(Truck_Locs(truck_ids[0], 41.257680, -95.934471, "Gene Lahey Mall", 0))
    locs.append(Truck_Locs(truck_ids[1], 41.257906, -95.933205, "Gene Lahey Mall", 0))
    locs.append(Truck_Locs(truck_ids[2], 41.258140, -95.934450, "Gene Lahey Mall", 0))
    locs.append(Truck_Locs(truck_ids[3], 41.260269, -95.934536, "Gavilon", 0))
    locs.append(Truck_Locs(truck_ids[4], 41.260164, -95.934525, "Gavilon", 0))
    locs.append(Truck_Locs(truck_ids[5], 41.238597, -96.015325, "Aksarben Village", 0))
    locs.append(Truck_Locs(truck_ids[6], 41.234072, -96.046850, "Canfield's - West Center", 0))
    locs.append(Truck_Locs(truck_ids[7], 41.265259, -96.068353, "Westroads Mall", 0))
    locs.append(Truck_Locs(truck_ids[8], 41.260010, -96.182198, "Village Pointe", 0))
    locs.append(Truck_Locs(truck_ids[9], 41.258541, -95.960062, "Turner Park", 0))

    Session.bulk_save_objects(locs)
    Session.commit()
    locs = Truck_Locs.query.all()

    if len(locs) == 0:
        print('[ERROR]')
        sys.exit(1)
    else:
        pprint([x.asdict() for x in locs])

if __name__ == '__main__':
    build()
