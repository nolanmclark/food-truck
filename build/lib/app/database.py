from urllib import parse
from sqlalchemy import create_engine, MetaData, Table, Column, ForeignKey, Integer, String
from sqlalchemy.orm import scoped_session, sessionmaker, mapper
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base

engine = create_engine('mysql://terry:%s@localhost/foodtruck' % parse.quote_plus('b@ckup'), convert_unicode=True)
Session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = Session.query_property()
Base.metadata.create_all(bind=engine)
'''
trucks = Table('trucks', metadata,
            Column('tid', Integer, primary_key=True),
            Column('name', String(100)),
            Column('email', String(320))
        )

users = Table('users', metadata,
            Column('uid', Integer, primary_key=True),
            Column('tid', Integer, ForeignKey('trucks.tid')),
            Column('fname', String(30)),
            Column('lname', String(30)),
            Column('email', String(320)),
            Column('phone', String(20))
        )
'''
#Base = automap_base(metadata=metadata)
#Base.prepare(engine)

#mapper(Trucks, trucks)
#mapper(Users, users)

#return Session

def init_db():
    import model
    Base.metadata.create_all(bind=engine)

#if __name__ == '__main__':
#    get_session()
