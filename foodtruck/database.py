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

def init_db():
    from foodtruck import model
    Base.metadata.create_all(bind=engine)
