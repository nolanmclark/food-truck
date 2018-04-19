import os
from sqlalchemy import or_
from foodtruck.database import Session
from foodtruck.model import *
import simplejson as json
import logging
import logging.config
from pprint import pprint
from collections import defaultdict

LOG_FILE = os.environ['FOODTRUCK_API_LOG_INI']
logging.config.fileConfig(LOG_FILE, disable_existing_loggers=False)
logger = logging.getLogger()


def auth(email, pw):
	user = Users.query.filter(Users.email == email).scalar()
	valid = user.validate_pswd(pw)
	logger.debug('password for %s: %s' % (email, valid))
	if valid:
		return user
	return -1


def auth_user(uid):
    user = Users.query.filter(Users.uid == uid).scalar()
    if user:
        return user
    return -1


def get_user(uid):
	user = Users.query.filter(Users.uid == uid).scalar()
	if user:
		return json.dumps(user.asdict())
	return -1


def all_trucks():
	trucks = [x.asdict() for x in Trucks.query.all()]
	return json.dumps(trucks)


def get_truck(tid):
	truck = Trucks.query.filter(Trucks.tid == tid).one_or_none()
	if truck:
		return json.dumps(truck.asdict())
	return -1


def all_locations():
	locs = [x.asdict() for x in Truck_Location.query.all()]
	return json.dumps(locs)


def get_location(tid):
	truck_loc = Truck_Location.query.filter(Truck_Location.tid == tid).one_or_none()
	if truck_loc:
		return json.dumps(truck_loc.asdict())
	return -1


def update_location(req):
	try:
		tid = req['tid']
		lat = req['lat']
		lng = req['lng']
		opn = req['open']

		truck = Truck_Locs.query.filter(Truck_Locs.tid == tid).one_or_none()
		if truck:
			truck.update_loc(lat, lng, opn)
			Session.commit()
		else:
			return -2
	except Exception as e:
		logger.critical(e)
		return -1
	return truck.tid


def update_menu(req):
	try:
		tid = req['tid']
		items = req['items']

		for item in items:
			menus = [x.mid for x in Menus.query.filter(Menus.tid == tid).all()]
			i = Menu_Items.query.filter(Menu_Items.iid == item['iid'], Menu_Items.mid.in_(menus)).one_or_none()

			if i:
			    try:
			        mid = i.mid
			        cat = item['category']
			        it = item['item']
			        inv = item['inv']
			        descr = item['descr']
			        price = item['price']
			        
			        i.update_item(mid, cat, it, inv, descr, price)
			        Session.commit()
			    except Exception as e:
			        logger.critical(e)
			        return -1
			else:
			    return -2
	except Exception as e:
		logger.critical(e)
		return -1
	return tid


def all_users():
	users = [x.asdict() for x in Users.query.all()]
	return json.dumps(users)


def all_menus():
	menus = [x.asdict() for x in Menus.query.all()]
	return json.dumps(menus)

def menu(tid):
	menus = defaultdict(dict)

	mid = Session.query(Menus.mid).filter(Menus.tid == tid, Menus.active == 1).first()
	categories = [x[0] for x in Session.query(Menu_Items.category).filter(Menu_Items.mid == mid).distinct().all()]
	for cat in categories:
		menus[cat] = [x.asitem() for x in Menu_Items.query.filter(Menu_Items.mid == mid, Menu_Items.category == cat).all()]
	return json.dumps(menus)

	
def all_messages(tid):
	messages = [x.asdict() for x in Messages.query.filter(Messages.tid == tid).all()]
	return json.dumps(messages)


def send_message(message):
	try:
		tid = message['tid']
		name = message['cntc_name']
		email = message['email_addr']
		phone = message['phone']
		message = message['message']

		msg = Messages(tid, name, email, phone, message)
		Session.add(msg)
		Session.commit()
	except Exception as e:
		logger.critical(e)
		return -1
	return msg.mid


def delete_message(mid):
	del_flag = Messages.query.filter(Messages.mid == mid).delete()
	Session.commit()

	return del_flag


def register_user(req):
	try:
		fname = req['fname']
		lname = req['lname']
		email = req['email']
		pswd = req['pswd']
		phone = req['phone']
		secret = req['secret']

		truck = Trucks.query.filter(Trucks.secret == secret).one_or_none()
		if truck:
			usr = Users(pswd, truck.tid, fname, lname, email, phone)
	except Exception as e:
		logger.critical(e)
		return -1
	return usr.uid


def reset_password(req):
	try:
		uid = req['id']
		old_pw = req['old_pw']
		new_pw = req['new_pw']

		usr = Users.query.filter(Users.uid == uid).one_or_none()
		if usr and usr.validate_pswd(old_pw):
			usr.set_pswd(new_pw)
			Session.commit()
		else:
			return -2
	except Exception as e:
		logger.critical(e)
		return -1
	return usr.uid
