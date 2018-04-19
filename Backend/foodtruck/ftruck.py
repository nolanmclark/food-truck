import os
from flask import Flask, Response, request, current_app, jsonify
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS
from flask_mail import Mail, Message
from werkzeug.security import safe_str_cmp
from datetime import datetime
import logging
import logging.config
import json
from foodtruck.database import Session
import functions

LOG_FILE = os.environ['FOODTRUCK_API_LOG_INI']
logging.config.fileConfig(LOG_FILE, disable_existing_loggers=False)
logger = logging.getLogger()


def authenticate(email, pw):
	logger.debug('checking email: %s, pw: %s' % (email, pw))
	user = functions.auth(email, pw)
	logger.debug(user)
	if user != -1:
		return user


def identity(payload):
	uid = payload['identity']
	logger.debug('payload: %s' % (uid))
	return {'user_id': functions.auth_user(uid).uid}


app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret'
app.config['JWT_AUTH_USERNAME_KEY'] = 'email'
app.config['JWT_AUTH_PASSWORD_KEY'] = 'pw'
jwt = JWT(app, authenticate, identity)
mail = Mail(app)


@jwt.jwt_payload_handler
def make_payload(identity):
	iat = datetime.utcnow()
	exp = iat + current_app.config.get('JWT_EXPIRATION_DELTA')
	nbf = iat + current_app.config.get('JWT_NOT_BEFORE_DELTA')
	identity = getattr(identity, 'uid') or identity['uid']
	return {'exp': exp, 'iat': iat, 'nbf': nbf, 'identity': identity}


@app.teardown_appcontext
def shutdown_session(exception=None):
	Session.remove()


@app.route('/protected')
@jwt_required()
def index():
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(json.dumps(dict(current_identity)))

'''
@app.route('/register', methods=['POST'])
def register():
	# consider only allowing foodtruck administrators to create new trucks
	# trucks have a 'secret' field that truck admins can share with
	# secondary users when they create their account for the truck
	logger.info("[%s] - %s" % (request.method, request.path))
	try:
		req = request.get_json()
		valid = functions.register(req)
	return Response(json.dumps({'status': valid})
'''

@app.route('/password/reset', methods=['POST'])
#@jwt_required()
def password_reset():
	logger.info("[%s] - %s" % (request.method, request.path))
	msg = {'status': 'error', 'error': ''}
	req = request.get_json()
	
	#usr = jwtoken.decode(req['id'], app.SECRET_KEY, algorithms=['HS256'])['identity']
	usr = current_identity['identity']
	req['id'] = usr

	res = functions.reset_password(req)
	if res == -2:
		msg['error'] = 'invalid user credentials'
	elif res == -1:
		msg['error'] = 'something bad happened'
	else:
		logger.info('password reset for uid: %s', res)
		del msg['error']
		msg['status'] = 'success'
	return Response(json.dumps(msg))
	

@app.route('/register/truck', methods=['POST'])
def register_truck():
	logger.info("[%s] - %s" % (request.method, request.path))
	req = request.get_json()
	msg = Message('New Truck Request - %s' % req['truck_name'],
		sender='admin@vs-genius.ddns.net', recipients=['vsg.fudtruck@gmail.com'])
	msg.body = "New truck request from %s (%s): %s." % (req['name'], req['email'], req['truck_name'])
	mail.send(msg)
	return Response(json.dumps({'status': 'sent'}))


@app.route('/register/user', methods=['POST'])
def register_user():
	logger.info("[%s] - %s" % (request.method, request.path))
	req = request.get_json()
	return Response(functions.register_user())


@app.route('/trucks', methods=['GET'])
def all_trucks():
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.all_trucks())


@app.route('/truck/<tid>', methods=['GET'])
#@jwt_required()
def get_truck(tid):
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.get_truck(tid))


@app.route('/locations', methods=['GET'])
def all_locations():
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.all_locations())


@app.route('/location/<tid>', methods=['GET'])
def get_location(tid):
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.get_location(tid)) 


@app.route('/location/update', methods=['POST'])
#@jwt_required()
def update_location():
	logger.info("[%s] - %s" % (request.method, request.path))
	req = request.get_json()
	logger.debug(req)
	res = functions.update_location(req)
	if res != -1:
		logger.info('updated loc of tid=%s', res)
		msg = 'success'
	else:
		msg = 'error'
	return Response(json.dumps({'status': msg}))


@app.route('/users', methods=['GET'])
def all_users():
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.all_users())


@app.route('/user/<uid>', methods=['GET'])
def get_user(uid):
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.get_user(uid)) 


@app.route('/menus', methods=['GET'])
def all_menus():
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.all_menus())


@app.route('/menu/<tid>', methods=['GET'])
def menu(tid):
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.menu(tid)) 


@app.route('/menus/update/<tid>', methods=['POST'])
#@jwt_required()
def update_menu(tid):
	logger.info("[%s] - %s" % (request.method, request.path))
	req = request.get_json()
	logger.debug(req)
	res = functions.update_menu(req)
	if res != -1:
		logger.info('update menu for tid=%s', tid)
		msg = 'success'
	else:
		msg = 'error'
	return Response(json.dumps({'status': msg}))


@app.route('/messages/<tid>', methods=['GET'])
#@jwt_required
def messages(tid):
	logger.info("[%s] - %s" % (request.method, request.path))
	return Response(functions.all_messages(tid))


@app.route('/messages/delete/<mid>', methods=['GET'])
#@jwt_required()
def delete_message(mid):
	logger.info("[%s] - %s" % (request.method, request.path))
	res = functions.delete_message(mid)

	if res == 1:
		logger.info('deleted mid=%s', mid)
		msg = 'success'
	else:
		msg = 'error'

	return Response(json.dumps({'status': msg}))


@app.route('/contact', methods=['POST'])
def send_message():
	logger.info("[%s] - %s" % (request.method, request.path))
	req = request.get_json()
	logger.debug(req)
	res = functions.send_message(req)
	if res != -1:
		logger.info('added mid=%s', res)
		msg = 'success'
	else:
		msg = 'error'

	return Response(json.dumps({'status': msg}))


@app.after_request
def after_request(response):
	response.headers['Content-Type'] = 'application/json'
	response.headers['Access-Control-Allow-Headers'] = 'access-control-allow-origin,content-type,authorization'
	response.headers['Access-Control-Allow-Origin'] = '*'
	return response


if __name__ == '__main__':
	app.run(debug=False)
