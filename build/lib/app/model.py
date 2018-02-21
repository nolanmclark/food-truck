from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Trucks (Base):
    __tablename__ = 'trucks'
    tid = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(320))
    
    def __init__(self, name=None, email=None):
        self.name = name
        self.email = email

    def __repr__(self):
        return '<tid: {}, name: {}, email: {}>'.format(self.tid, self.name, self.email)

    def asdict(self):
        return  {
                    'tid': self.tid,
                    'name': self.name,
                    'email': self.email
                }

class Users (Base):
    __tablename__ = 'users'
    uid = Column(Integer, primary_key=True)
    tid = Column(Integer, ForeignKey('trucks.tid'))
    fname = Column(String(30))
    lname = Column(String(30))
    email = Column(String(320))

    def __init__(self, fname=None, lname=None, email=None):
        self.uid = uid
        self.tid = tid
        self.fname = fname
        self.lname = lname
        self.email = email

    def __str__(self):
        return 'uid: {}, tid: {}, fname: {}, lname: {}, email: {}' \
            .format(self.uid, self.tid, self.fname, self.lname, self.email)

    def asdict(self):
        return  {
                    'uid': self.uid,
                    'tid': self.tid,
                    'fname': self.fname,
                    'lname': self.lname,
                    'email': self.email,
                    'phone': self.phone
                }
