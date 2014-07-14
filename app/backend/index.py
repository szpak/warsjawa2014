from flask import Flask
from flask import json
from bson import json_util
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('db', 27017)
db = client.warsjawa

def toJson(data):
    return json.dumps(data, default=json_util.default)

@app.route('/api/speakers')
def test_json():
    speakers_docs = [doc for doc in db.speakers.find({},{"_id":0})]
    return toJson(speakers_docs)

if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run(host="0.0.0.0",port=81)