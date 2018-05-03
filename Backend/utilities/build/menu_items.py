import sys
from foodtruck.database import Session
from foodtruck.model import Menus, Menu_Items
from pprint import pprint

def build():
	menu_ids = Session.query(Menus.mid).filter(Menus.active == 1).all()
	if len(menu_ids) == 0:
		print('[ERROR] - There are no menus.')
		sys.exit(1)
		
	items= []
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Black Forest Ham', 5, 'This ham sandwich is great. Like really great.', 3.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Turkey Breast', 5, 'This turkey sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Cold Cut Combo', 5, 'This Cold Cut Combo sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Chicken & Bacon Ranch Melt', 5, 'This chicken sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Italian B.M.T.', 5, 'This italian sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Meatball Marinara', 5, 'This meatball sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Roast Beef', 5, 'This roast beef sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Steak & Cheese', 5, 'This steak sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Club', 5, 'This club sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[0], 'Sandwiches', 'Classic Tuna', 5, 'This tuna sandwich is great. Like really great.', 4.99))
	items.append(Menu_Items(menu_ids[2], 'Extra Value Combos', 'Hamburger', 15, '(1/4 lb.) Pickle, Onion, Ketchup, Mustard with Regular Fries & Regular Drink', 5.99))
	items.append(Menu_Items(menu_ids[2], 'Extra Value Combos', 'Cheeseburger', 15, '(1/4 lb.) Pickle, Onion, Ketchup, Mustard with Regular Fries & Regular Drink', 6.49))
	items.append(Menu_Items(menu_ids[2], 'Extra Value Combos', 'Double Dom', 10, '(1/2 lb.) Cheese, Lettuce, Tomato, Bacon, Mayo, with Regular Fries & Regular Drink', 7.99))
	items.append(Menu_Items(menu_ids[2], 'Extra Value Combos', 'Double Cheeseburger', 10, '(1/2 lb.) Pickle, Onion, Ketchup, Mustard with Regular Fries & Regular Drink', 7.49))
	items.append(Menu_Items(menu_ids[2], 'Extra Value Combos', 'Foot Long Chili Dog', 5, 'With Regular Fries & Regular Drink', 6.89))
	items.append(Menu_Items(menu_ids[2], 'Specialty', 'Cheese Frenchee', 5, 'Batter Coated & Cheese Filled', 4.59))
	items.append(Menu_Items(menu_ids[2], 'Specialty', 'Chicken Fingers', 5, '(Choice of Honey Mustard, BBQ or Ranch)', 4.99))
	items.append(Menu_Items(menu_ids[2], 'Salad', 'Beef Taco Salad', 10, 'With spicy beef & beans.', 5.89))
	items.append(Menu_Items(menu_ids[2], 'Baked Potatoes', 'Regular Baked Potato', 5, 'With sour cream, butter & green onions.', 2.29))
	items.append(Menu_Items(menu_ids[2], 'Baked Potatoes', '"Loaded" Baked Potato', 5, 'Topped with sour cream, butter, cheddar cheese, bacon bits & green onions.', 2.99))
	items.append(Menu_Items(menu_ids[4], 'Appetizers', 'Drummies', 40, '10 plump chicken drummies.', 10.75))
	items.append(Menu_Items(menu_ids[4], 'Appetizers', 'Drummies From Hell', 30, 'dipped in hot sauce or on side', 10.75))
	items.append(Menu_Items(menu_ids[4], 'Appetizers', 'Drummies From Heaven', 30, 'ranch dressing on side', 10.75))
	items.append(Menu_Items(menu_ids[4], 'Appetizers', 'Drummies From West', 30, 'BBQ sauce on side', 10.75))
	items.append(Menu_Items(menu_ids[4], 'Soup & Salad', 'Chicken Caesar Salad', 15, 'Grilled or crispy chicken served on a bed of lettuce with fresh shaved parmesan cheese, croutons, bacon bits and traditional Caesar dressing.', 7.95))
	items.append(Menu_Items(menu_ids[4], 'Soup & Salad', 'Beef Taco Salad', 15, 'Ruthie\'s favorite salad. Bed of lettuce layered with seasoned ground beef, cheddar cheese, tomatoes, onions, taco Doritos and special dressing.', 8.25))
	items.append(Menu_Items(menu_ids[4], 'Soup & Salad', 'Buffalo Chicken Salad', 15, 'Crisp lettuce with cabbage, carrots, tomatoes, bacon bits, cheddar cheese, & choice of grilled or crispy chicken tossed in Barrett\'s buffalo sauce.', 7.75))
	items.append(Menu_Items(menu_ids[4], 'Specialties', 'Our Famous Pork Tenderloin', 100, 'This little piggy went to market..but the piggy only goes once a week. First come, first served! A hefty pork tenderloin lightly breaded and served with the works: cheese, mayo, lettuce, tomato, pickles and onions on a sesame seed bun.', 10.25))
	items.append(Menu_Items(menu_ids[4], 'Specialties', 'The Blarneystone', 25, 'This pub favorite isn\'t full of Blarney- it\'s full of diced turkey breast mixed w/ cream cheese, sweet red onions and Swiss cheese, grilled marble bread.', 8.25))
	items.append(Menu_Items(menu_ids[4], 'Specialties', 'Reuben', 25, 'Corned beef, Swiss cheese, sauerkraut, 1000 island dressing, grilled on marble bread - a favorite in the town it was created. For a healthier choice, ask for a Turkey Reuben!', 8.50))
	items.append(Menu_Items(menu_ids[1], "Sandwiches", "Pork Banh Mi", 7, "French loaf and things and meat", 7.99))
	items.append(Menu_Items(menu_ids[1], "Sandwiches", "Billy Club", 10, "Roast Beef, Smoked Ham, Grey Poupon, Lettuce, Tomato", 6.99))
	items.append(Menu_Items(menu_ids[1], "Sandwiches", "Italian Night Club", 20, "Genoa salami, capicola, ham, provolone, lettuce, tomato, onions, mayo & vinaigrette", 6.99))
	items.append(Menu_Items(menu_ids[1], "Sandwiches", "Hunters Club", 69, "Double roast beef, provolone, lettuce, tomato & mayo", 3.99))
	items.append(Menu_Items(menu_ids[1], "Sandwiches", "Country Club", 234, "Turkey breast, ham, provolone, lettuce, tomato & mayo.", 9.04))
	items.append(Menu_Items(menu_ids[1], "Sandwiches", "Beach Club", 40, "Turkey breast, avocado spread, cucumber, cheese, lettuce, tomato & mayo.", 39.32))
	items.append(Menu_Items(menu_ids[1], "Sandwiches", "Bootlegger Club", 34, "Roast beef, turkey breast, lettuce, tomato & mayo.", 0.99))
	items.append(Menu_Items(menu_ids[1], "Omelettes", "Bacon Omelette", 2, "Eggs, bacon, cheese, flavuh-flaaaav", 8.99))
	items.append(Menu_Items(menu_ids[1], "Omelettes", "Denver Omelette", 3, "Stuffed with pepper, ham, onions, American cheese", 10.50))
	items.append(Menu_Items(menu_ids[1], "Omelettes", "Philly Omelette", 4, "Omelette delivered fresh from WaWa", 19.30))
	items.append(Menu_Items(menu_ids[3], "Burgers", "Original", 2398502, "Add your choice of Cheddar, Pepperjack, Swiss, American, Habanero Jack or Gouda", 49.29))
	items.append(Menu_Items(menu_ids[3], "Burgers", "Three Cheese Burger", 30, "buns/beef/battlestar 3 cheeses", 22.98))
	items.append(Menu_Items(menu_ids[3], "Burgers", "Guac On the Moon", 69, "Topped with a generous portion of fresh house-made guacamole, pico de gallo and queso fresco.", 02.93))
	items.append(Menu_Items(menu_ids[3], "Burgers", "Elvis Burger", 420, "Topped with creamy peanut butter, 2 slices of bacon and American cheese.", 69.69))
	items.append(Menu_Items(menu_ids[3], "Hooch", "Natty Rush", 35, "It's like diet 4loko", 2.99))
	items.append(Menu_Items(menu_ids[3], "Beer", "Busch Latte", 20, "for when u love NASCAR", 18.78))
	items.append(Menu_Items(menu_ids[3], "Beer", "Bud Diesel", 40, "Actual gasoline, but flavored like America", 17.87))
	items.append(Menu_Items(menu_ids[3], "Beer", "PBRRRRRRRR", 203, "Sponsored by yelawolf and hippies", 3.20))
	items.append(Menu_Items(menu_ids[3], "Beer", "Kirkland Light", 40, "Generic beer == Beer still", 18.98))
	items.append(Menu_Items(menu_ids[3], "Beer", "Michelob Ultra", 28, "sports beer, basically gatorade", 430.20))
	items.append(Menu_Items(menu_ids[5], "Beer", "Ranch Punch", 9, "buttermilk ranch on the roccs", 2.00))
	items.append(Menu_Items(menu_ids[5], "Beer", "Colt 45", 45, "comes with plastic bag homeless man coozie!", 3.00))
	items.append(Menu_Items(menu_ids[5], "Beer", "Montucky Cold Snacks", 890, "all profits donated to charity", 3.50))
	items.append(Menu_Items(menu_ids[5], "Beer", "Guinness", 433, "made with McGregor's actual sweat (yum!)(mate)", 2091.30))
	items.append(Menu_Items(menu_ids[5], "Hooch", "MD 20|20", 20, "It's like juice but has like 12% abv and will give you mad tooth decay", 4.56))
	items.append(Menu_Items(menu_ids[5], "Hooch", "Dirty Sprite", 17, "Houston Export sTrAiGhT uP!", 29.20))
	items.append(Menu_Items(menu_ids[5], "Hooch", "Barton's", 1, "Triple Carbon Filtered. Shatterproof bottle, served with a side of gatorade", 10.68))
	items.append(Menu_Items(menu_ids[5], "Hooch", "Snorkel", 23, "redbull vodka that you get to shotgun", 4.55))
	items.append(Menu_Items(menu_ids[5], "Hooch", "Disgusting Gold Tequila", 230, "Probably contact your uber before ordering", 20.39))
	items.append(Menu_Items(menu_ids[5], "Beer", "Heinekin Mini Keg", 227, "What am I, Diplo?", 39.39))
	items.append(Menu_Items(menu_ids[7], "Wings", "Buffalo", 30, "Spicy/good", 12.39))
	items.append(Menu_Items(menu_ids[7], "Wings", "Lemon Pepper", 35, "Wet. Dozen flats.", 13.49))
	items.append(Menu_Items(menu_ids[7], "Wings", "BBQ", 10, "for wimps", 8.90))
	items.append(Menu_Items(menu_ids[7], "Wings", "Carribean Jerk", 58, "sponsored by Disney Cruises", 10.34))
	items.append(Menu_Items(menu_ids[7], "Wings", "Super Inferno Death Sauce", 39, "please sign a waiver", 9.92))
	items.append(Menu_Items(menu_ids[7], "Wings", "Chipotle", 20, "smokey and delicious", 18.99))
	items.append(Menu_Items(menu_ids[7], "Wraps", "JCole Jalapeno Cheddar", 29, "probably went double platnum with no features (no sides allowed to be orderd with this)", 8.39))
	items.append(Menu_Items(menu_ids[7], "Wraps", "Drake Dijon Mustard Chicken", 10, "i OnLy LoVe My MoM aNd ChIcKeN iM sOrRy", 4.56))
	Session.bulk_save_objects(items)
	Session.commit()
	pprint([x.asdict() for x in Menu_Items.query.all()])
		
if __name__ == '__main__':
	build()