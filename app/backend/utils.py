from flask import json
from bson import json_util

def toJson(data):
    return json.dumps(data, default=json_util.default)