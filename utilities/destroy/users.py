from foodtruck.database import Session
from foodtruck.model import Users
from pprint import pprint

# TODO find out how to reset TID autoincrement value
def delete():
    Users.query.delete()
    Session.commit()

    users = Users.query.all()
    if len(users) == 0:
        print('[SUCCESS]')
    else:
        print('[ERROR]')
        pprint([x.asdict() for x in users])

if __name__ == '__main_':
    delete()
