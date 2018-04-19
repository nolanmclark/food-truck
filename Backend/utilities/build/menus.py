import sys
from foodtruck.database import Session
from foodtruck.model import Menus, Trucks
from pprint import pprint

def build():
	truck_ids = Session.query(Trucks.tid).all()
	if len(truck_ids) == 0:
		print('[ERROR] - There are no trucks.')
		sys.exit(1)
		
	menus = []
	menus.append(Menus(truck_ids[0], 'activemenu.com', 1))
	menus.append(Menus(truck_ids[0], 'inactivemenu.com', 0))
	menus.append(Menus(truck_ids[1], 'realgoodfood.com', 1))
	menus.append(Menus(truck_ids[2], 'fudtrucc.com', 1))
	menus.append(Menus(truck_ids[3], 'snaccs.com', 1))
	menus.append(Menus(truck_ids[4], 'hooraytesturlwebsite.com', 1))
	menus.append(Menus(truck_ids[5], 'plsbuyfood.com', 1))
	menus.append(Menus(truck_ids[6], 'fudtruccccccccccccc.com', 1))
	menus.append(Menus(truck_ids[7], 'grassEatnSzn.com', 1))
	menus.append(Menus(truck_ids[8], 'urlsnstuff.com', 1))
	menus.append(Menus(truck_ids[9], 'backupterry.com', 1))

	
	Session.bulk_save_objects(menus)
	Session.commit()
	pprint([x.asdict() for x in Menus.query.all()])
		
if __name__ == '__main__':
	build()
