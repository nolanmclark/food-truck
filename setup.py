from distutils.core import setup

setup(
    name="FoodTruck",
    version="1.4.0",

    author="VSGenius",
    author_email="caseyschmitz@unomaha.edu",

    packages=["foodtruck"],

    url="https://cms-maverick.ddns.net/api/foodtruck",

    description="API for FoodTruck application.",

    requires=[
        "flask",
        "sqlalchemy",
        "mysqlclient",        
    ],

)
