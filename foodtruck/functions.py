import os
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
    valid = user.validate_pw(pw)
    logger.debug('password for %s: %s' % (email, valid))
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
