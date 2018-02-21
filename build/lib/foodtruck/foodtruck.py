from flask import Flask, Response
import json
from database import Session
import functions

app = Flask(__name__)

@app.teardown_appcontext
def shutdown_session(exception=None):
    Session.remove()

@app.route('/')
def index():
    return Response(json.dumps({'check': 'one two'}))

@app.route('/trucks', methods=['GET'])
def all_trucks():
    return Response(functions.all_trucks())

if __name__ == '__main__':
    app.run(debug=False)
