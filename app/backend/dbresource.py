from pymongo import MongoClient

client = MongoClient('db', 27017)
db = client.warsjawa

def get_speakers():
    return [doc for doc in db.speakers.find({"status" : {"$nin":["new","fill"]}},{"_id":0, "hash":0, "email":0})]

def save_speaker(key, json):
    return db.speakers.update({"hash":key},{"$set":{"description":json, "status":"fill"}})

def init_speaker(speaker_name, speaker_email, speaker_hash):
    return db.speakers.insert({"name":speaker_name,"email":speaker_email,"hash":speaker_hash,"status":"new"})