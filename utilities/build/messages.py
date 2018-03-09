import sys
from foodtruck.database import Session
from foodtruck.model import Messages, Trucks
from pprint import pprint

def build():
	truck_ids = Session.query(Trucks.tid).all()
	if len(truck_ids) == 0:
		print('[ERROR] - There are no trucks.')
		sys.exit(1)

	messages = []
	messages.append(Messages(truck_ids[0], 'terry backup', 'terry@backup.com', '4205551234', 'plz back up'))
	messages.append(Messages(truck_ids[0], 'terrence backeth', 'terry@backup.com', '4205551245', 'back up'))
	messages.append(Messages(truck_ids[0], 'lord quavious', 'terry@backup.com', '4209051256', 'back up plz'))
	messages.append(Messages(truck_ids[1], 'latrell backemup', 'terry@backup.com', '4208951267', 'plz back up tho'))
	messages.append(Messages(truck_ids[2], 'joe lawdterry', 'terry@backup.com', '4207851278', 'srsly back up'))
	messages.append(Messages(truck_ids[2], 'dave ohlawd', 'terry@backup.com', '4206751289', 'dood back up'))
	messages.append(Messages(truck_ids[3], 'mark baaackup', 'terry@backup.com', '4205651290', 'back up 4reel'))
	messages.append(Messages(truck_ids[3], 'kyle wutizudoin', 'terry@backup.com', '4204553434', 'not kid back up'))
	messages.append(Messages(truck_ids[4], 'kenneth fkitup', 'terry@backup.com', '4203454534', 'lawd back up'))
	messages.append(Messages(truck_ids[5], 'jack terry', 'terry@backup.com', '4202355634', 'back up wat iz u doin'))
	messages.append(Messages(truck_ids[6], 'karl lawd', 'terry@backup.com', '4201256734', 'w-w-wat iz u doin terry'))

	Session.bulk_save_objects(messages)
	Session.commit()
	pprint([x.asdict() for x in Messages.query.all()])


if __name__ == '__main__':
	build()
