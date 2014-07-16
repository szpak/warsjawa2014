from flask import Flask, request

import dbresource
import mailgunresource
import utils
import authentication
import os, binascii

app = Flask(__name__)

@app.route('/api/speakers')
def speakers():
    return utils.toJson(dbresource.get_speakers())

@app.route('/api/speakers', methods=['POST'])
def new_speaker():
    authenticated = authentication.verify(request.values.get("token"), request.values.get("timestamp"), request.values.get("signature"))
    if not authenticated:
        print "Not authenticated"
        return utils.toJson({"status":"Not authenticated"})

    body = request.values.get("body-plain")
    body_list = [s.strip() for s in body.splitlines()]
    print body_list

    if len(body_list) != 2:
        print "Wrong e-mail body"
        return utils.toJson({"status":"Wrong e-mail body"})

    speaker_name = body_list[0]
    speaker_email = body_list[1]
    speaker_hash = binascii.b2a_hex(os.urandom(128))

    dbresource.init_speaker(speaker_name, speaker_email, speaker_hash)
    print mailgunresource.send_new_speaker_email(speaker_name, speaker_email, speaker_hash)
    return utils.toJson({"status":"done"})

@app.route('/api/speakers/<key>', methods=['PUT'])
def set_speaker_details(key):
    save_result =  dbresource.save_speaker(key, request.get_json())

    if save_result["nModified"] is 1:
        return utils.toJson({"status":"done"})
    else:
        return utils.toJson({"status":"speaker not registered"})

if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run(host="0.0.0.0",port=81)