import os
from foodtruck.database import Session
from foodtruck.model import *
import simplejson as json
import logging
import logging.config
from pprint import pprint

LOG_FILE = os.environ['FOODTRUCK_API_LOG_INI']
logging.config.fileConfig(LOG_FILE, disable_existing_loggers=False)
logger = logging.getLogger()


def auth(email, pw):
    user = Users.query.filter(Users.email == email).scalar()
    valid = user.validate_pw(pw)
    logger.debug('password for %s: %s' % (email, valid))
    if valid:
        return user
    return -1


def register(request):
    # consider changing this to just sending an email to admin@foodtruck.com
    '''
    try:
        email = request['email']
        fname = request['fname']
        lname = request['lname']
        truck = request['truck']
        pw = request['pw']
    except:
        return 'invalid request parameters'
    user_exists = Users.query.filter(Users.email == email).count()
    if user_exists > 0:
        return 'account already exists for that email'
    
    truck_exists = Trucks.query.filter(Trucks.tid == truck).count()
    user = Users(pw, tid, fname, lname, email)
    Session.add(user)
    Session.commit()
    return 'success'
    '''
    pass


def get_user(uid):
    user = Users.query.filter(Users.uid == uid).scalar()
    if user:
        return user
    return -1


def all_trucks():
    trucks = [x.asdict() for x in Trucks.query.all()]
    return json.dumps(trucks)


def all_locations():
    locs = [x.asdict() for x in Truck_Location.query.all()]
    return json.dumps(locs)


def all_users():
    users = [x.asdict() for x in Users.query.all()]
    return json.dumps(users)


def all_menus():
    menus = [x.asdict() for x in Menus.query.all()]
    return json.dumps(menus)

