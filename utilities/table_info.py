from foodtruck.database import Session
from foodtruck import model
from pprint import pprint

tables = [(name, list(cls.__table__.columns)) for name, cls in model.__dict__.items() if isinstance(cls, type) and cls.__dict__['__module__'] == 'foodtruck.model']
for n, cols in tables:
    print('%s:' % (n))
    for c in cols:
        print("\t%s" % (repr(c)))
