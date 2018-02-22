import sys
from foodtruck.database import Session
from foodtruck.model import Menus, Menu_Items
from pprint import pprint

def build():
	menu_ids = Session.query(Menus.mid).all()
	if len(menu_ids) == 0:
		print('[ERROR] - There are no menus.')
		sys.exit(1)
		
	items= []
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Ham Sandwich', 5, 'This ham sandwich is great. Like really great.', 3.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Turkey Sandwich', 5, 'This turkey sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Tacos', 'Fish Tacos', 20, 'Frozen, never fresh cod on what might be tortillas. Set of 3.', 6.99))
	items.append(Menu_Items(menu_ids[0], 'Tacos', 'Chicken Tacos', 69, 'Half Breasts/Thigs for that optimum meat mixture. Set of 3', 3.99))
	items.append(Menu_Items(menu_ids[1], 'Sandwiches', 'Lamborghini Leg Lock', 5, "Sandwich so big it'll get you lookin like you're eating fried okra with oprah.", 23.99))
	
	Session.bulk_save_objects(items)
	#Session.commit()
	pprint([x.asdict() for x in Menu_Items.query.all()])
		
if __name__ == '__main__':
	build()
