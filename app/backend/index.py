from flask import Flask, json, request, Response
from bson import json_util
from pymongo import MongoClient
from functools import wraps
import os

app = Flask(__name__)

client = MongoClient('db', 27017)
db = client.warsjawa

def toJson(data):
    return json.dumps(data, default=json_util.default)

def check_auth(username, password):
    return username == os.environ.get('HTTP_USERNAME') and password == os.environ.get('HTTP_PASS')

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return Response("Not authorized", 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
        return f(*args, **kwargs)
    return decorated

@app.route('/api/speakers')
def speakers():
    speakers_docs = [doc for doc in db.speakers.find({},{"_id":0})]
    return toJson(speakers_docs)

@app.route('/api/speakers', methods=['POST'])
@requires_auth
def newSpeaker():
	#TODO Save to DB
	#TODO Send Email
    return toJson({"status":"done"})


if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run(host="0.0.0.0",port=81)