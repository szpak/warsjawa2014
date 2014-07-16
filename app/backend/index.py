from flask import Flask

import dbresource
import mailgunresource
import utils
import authentication

app = Flask(__name__)

@app.route('/api/speakers')
def speakers():
    return utils.toJson(dbresource.getSpeakers())

@app.route('/api/speakers', methods=['POST'])
@authentication.requires_auth
def newSpeaker():
    print mailgunresource.sendNewSpeakerEmail("Speaker Name", "michal@warsjawa.pl", "SOME_M$GIC_K3Y")
    return utils.toJson({"status":"done"})

if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run(host="0.0.0.0",port=81)