from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, join
from sqlalchemy.orm import column_property
from sqlalchemy.dialects.mysql import TINYINT, DATETIME
from passlib.hash import bcrypt
import hashlib
import time
from datetime import datetime
from foodtruck.database import Base

class Trucks (Base):
	__tablename__ = 'trucks'
	tid = Column(Integer, primary_key=True, autoincrement=True)
	secret = Column(String(32))
	name = Column(String(100))
	email = Column(String(320))
	
	def __init__(self, name, email):
		self.name = name
		self.email = email
		hash = hashlib.sha1()
		hash.update(str(time.time()).encode('utf-8'))
		self.secret = hash.hexdigest()[:32]

	def validate_secret(self, secr):
		if secr == self.secret:
			return True
		return False

	def __str__(self):
		return 'tid: {}, secret: {}, name: {}, email: {}'.format(self.tid, self.secret, self.name, self.email)

	def asdict(self):
		return  {
		'tid': self.tid,
		'secret': self.secret,
		'name': self.name,
		'email': self.email
	}

class Users (Base):
	__tablename__ = 'users'
	uid = Column(Integer, primary_key=True, autoincrement=True)
	pswd = Column(String(60))
	tid = Column(Integer, ForeignKey('trucks.tid'))
	fname = Column(String(30))
	lname = Column(String(30))
	email = Column(String(320), unique=True)
	phone = Column(String(20))

	def __init__(self, pswd, tid, fname, lname, email, phone):
		self.pswd = bcrypt.encrypt(pswd)
		self.tid = tid
		self.fname = fname
		self.lname = lname
		self.email = email
		self.phone = phone
	
	def set_pswd(self, pw):
		try:
			self.pswd = bcrypt.encrypt(pw)
			return 0
		except:
			return 'error'

	def validate_pswd(self, pw):
		return bcrypt.verify(pw, self.pswd)

	def __str__(self):
		return 'uid: {}, tid: {}, fname: {}, lname: {}, email: {}, phone: {}' \
	  .format(self.uid, self.tid, self.fname, self.lname, self.email, self.phone)

	def asdict(self):
		return  {
		'uid': self.uid,
		'tid': self.tid,
		'fname': self.fname,
		'lname': self.lname,
		'email': self.email,
		'phone': self.phone
	}

class Truck_Locs (Base):
	__tablename__ = 'truck_locs'
	tid = Column(Integer, ForeignKey('trucks.tid'), primary_key=True)
	lat = Column(Numeric(10,8))
	lng = Column(Numeric(11,8))
	address = Column(String(140))
	open = Column(TINYINT)
	
	def __init__(self, tid, lat, lng, address, opn):
		self.tid = tid
		self.lat = lat 
		self.lng = lng 
		self.address = address
		self.open = opn
		
	def __str__(self):
		return 'tid: {}, lat: {}, lng {}, address: {}, open: {}'\
			.format(self.tid, self.lat, self.lng, self.address, self.open)
		
	def update_loc(self, lat, lng, opn):
		try:
			self.lat = lat
			self.lng = lng
			self.open = opn
			return 0
		except:
			return 'error'

	def asdict(self):
		return {
	'tid': self.tid,
	'lat': self.lat,
	'lng': self.lng,
	'address': self.address,
	'open': self.open
			}


class Menus (Base):
	__tablename__ = 'menus'
	mid = Column(Integer, primary_key=True, autoincrement=True)
	active = Column(Integer)
	tid = Column(Integer, ForeignKey('trucks.tid'))
	menu_img_url = Column(String(100)) 
	
	def __init__(self, tid, menu_img_url, active=0):
		self.active = active
		self.tid = tid
		self.menu_img_url = menu_img_url
		
	def __str__(self):
		return 'mid: {}, tid: {}, menu_img_url: {}, active: {}' \
		.format(self.mid, self.tid, self.menu_img_url, self.active)
		
	def asdict(self):
		return {
	'mid': self.mid,
	'tid': self.tid,
	'menu_img_url': self.menu_img_url,
	'active': self.active
	}

	
class Menu_Items (Base):
	__tablename__ = 'menu_items'
	iid = Column(Integer, primary_key=True, autoincrement=True)
	mid = Column(Integer, ForeignKey('menus.mid'))
	category = Column(String(100))
	item = Column(String(100))
	inv = Column(Integer) 
	descr = Column(String(400))
	price = Column(Numeric(13,2))
	
	def __init__(self, mid, category, item, inv, descr, price):
		self.mid = mid
		self.category = category
		self.item = item
		self.inv = inv
		self.descr = descr
		self.price = price
		
	def __str__(self):
		return 'iid: {}, mid: {}, category: {}, item: {}, inv: {}, descr: {}, price: {}' \
			.format(self.iid, self.mid, self.category, self.inv, self.descr, self.price)
	
	def update_item(self, mid, category, item, inv, descr, price):
		self.__init__(mid, category, item, inv, descr, price)

	def asitem(self):
		return {
			'iid': self.iid,
			'category': self.category,
			'item': self.item,
			'inv': self.inv,
			'descr': self.descr,
			'price': "%.2f" % self.price
			}	

		
	def asdict(self):
		return {
			'iid': self.iid,
			'mid': self.mid,
			'category': self.category,
			'item': self.item,
			'inv': self.inv,
			'descr': self.descr,
			'price': "%.2f" % self.price
			}	


class Messages (Base):
	__tablename__ = 'messages'
	mid = Column(Integer, primary_key=True, autoincrement=True)
	tid = Column(Integer, ForeignKey('trucks.tid'))
	cntc_name = Column(String(60))
	cntc_email = Column(String(320))
	cntc_phone = Column(String(20))
	msg = Column(String(256))
	subm_dt = Column(DATETIME)

	def __init__(self, tid, cntc_name, cntc_email, cntc_phone, msg):
		self.tid = tid
		self.cntc_name = cntc_name
		self.cntc_email = cntc_email
		self.cntc_phone = cntc_phone
		self.msg = msg
		self.subm_dt = datetime.utcnow()

	def __str__(self):
		return 'mid: {}, tid: {}, cntc_name: {}, cntc_email: {}, cntc_phone: {}, msg: {}, subm_dt: {}' \
		.format(self.mid, self.tid, self.cntc_name, self.cntc_email, self.cntc_phone, self.msg, self.subm_dt)
		
	def asdict(self):
		return {
	'mid': self.mid,
	'tid': self.tid,
	'cntc_name': self.cntc_name,
	'cntc_email': self.cntc_email,
	'cntc_phone': self.cntc_phone,
	'msg': self.msg,
	'subm_dt': self.subm_dt.strftime('%Y-%m-%d %H:%M:%S')
	}

	
truck_location = join(Trucks, Truck_Locs)
class Truck_Location(Base):
	__table__ = truck_location

	tid = column_property(Trucks.tid, Truck_Locs.tid)
	name = Trucks.name
	lat = Truck_Locs.lat
	lng = Truck_Locs.lng
	address = Truck_Locs.address
	open = Truck_Locs.open

	def __str__(self):
		return 'tid: {}, name: {}, lat: {}, lng {}, address: {}, open: {}'\
			.format(self.tid, self.name, self.lat, self.lng, self.address, self.open)

	def asdict(self):
		return {
	'tid': self.tid,
	'name': self.name,
	'lat': self.lat,
	'lng': self.lng,
	'address': self.address,
	'open': self.open
	}
