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


def auth(uid, pw):
    user = Users.query.filter(Users.uid == uid).scalar()
    valid = user.validate_pw(pw)
    logger.debug('password for %s: %s' % (uid, valid))
    if valid:
        return user
    return -1


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

