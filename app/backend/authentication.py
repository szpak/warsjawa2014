from flask import request, Response
import os
from functools import wraps

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
