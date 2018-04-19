import sys
from foodtruck.database import Session
from foodtruck.model import Users, Trucks
from pprint import pprint

def build():
    truck_ids = Session.query(Trucks.tid).all()
    if len(truck_ids) == 0:
        print('[ERROR] - There are no trucks.')
        sys.exit(1)

    users = []
    users.append(Users('rjames987', truck_ids[0], 'Rick', 'James', 'rjames@example.com', '4025551234'))
    users.append(Users('tsmith123', truck_ids[1], 'Tom', 'Smith', 'tsmith@example.com', '4025552345'))
    users.append(Users('ajohnson', truck_ids[2], 'Alan', 'Johnson', 'ajohnson@example.com', '4025553456'))
    users.append(Users('pdouglas', truck_ids[3], 'Peter', 'Douglas', 'pdouglas@example.com', '4025554567'))
    users.append(Users('kwilmes345', truck_ids[4], 'Keith', 'Wilmes', 'kwilmes@example.com', '4025555678'))
    users.append(Users('jcarter888', truck_ids[5], 'John', 'Carter', 'jcarter@example.com', '4025556789'))
    users.append(Users('arodgers', truck_ids[6], 'Alex', 'Rodgers', 'arodgers@example.com', '4025557890'))
    users.append(Users('bjeffereies0', truck_ids[7], 'Bill', 'Jefferies', 'bjefferies@example.com', '4025551233'))
    users.append(Users('bmcelroy33', truck_ids[8], 'Bruce', 'McElroy', 'bmcelroy@example.com', '4025552344'))
    users.append(Users('alarson678', truck_ids[9], 'Adam', 'Larson', 'alarson@example.com', '4025553455'))

    Session.bulk_save_objects(users)
    Session.commit()
    pprint([x.asdict() for x in Users.query.all()])

if __name__ == '__main__':
    build()
