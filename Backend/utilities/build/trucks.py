import sys
from foodtruck.database import Session
from foodtruck.model import Trucks, Truck_Locs
from pprint import pprint

def build():
    trucks = []
    trucks.append(Trucks("For the Love of Food Truck", "ftloft@example.com"))
    trucks.append(Trucks("Anthony Piccolo's Mobile Venue", "apmv@example.com"))
    trucks.append(Trucks("A Taste of New Orleans Food Truck", "atonoft@example.com"))
    trucks.append(Trucks("The Dire Lion", "tdl@example.com"))
    trucks.append(Trucks("Dos De Oros", "ddo@example.com"))
    trucks.append(Trucks("KGB Gourmet Food Truck", "kgbgft@example.com"))
    trucks.append(Trucks("Maria Bonita Food Truck", "mbft@example.com"))
    trucks.append(Trucks("Mosaic Pickle", "mp@example.com"))
    trucks.append(Trucks("Scotty's Go-Go Grill", "sggg@example.com"))
    trucks.append(Trucks("Lonchera El Milagro", "lem@example.com"))


    Session.bulk_save_objects(trucks)
    Session.commit()
    trucks = Trucks.query.all()

    if len(trucks) == 0:
        print('[ERROR]')
        sys.exit(1)
    else:
        pprint([x.asdict() for x in trucks])

if __name__ == '__main__':
    build()
