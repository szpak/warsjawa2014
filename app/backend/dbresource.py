from bson import json_util
from pymongo import MongoClient

client = MongoClient('db', 27017)
db = client.warsjawa

def getSpeakers():
	return [doc for doc in db.speakers.find({},{"_id":0})]