import os
import hashlib, hmac

def verify(token, timestamp, signature):
    return signature == hmac.new(
        key=os.environ.get('MAILGUN_API_KEY'),
        msg='{}{}'.format(timestamp, token),
        digestmod=hashlib.sha256).hexdigest()