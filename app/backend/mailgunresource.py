import requests
import os

def sendNewSpeakerEmail(name, email, key):
    return requests.post(
        "https://api.mailgun.net/v2/sandboxb5f00e6ffa8c488aa5b15c1e373dd6c4.mailgun.org/messages",
        auth=("api", os.environ.get('MAILGUN_API_KEY')),
        data={"from": "Mailgun Sandbox <postmaster@sandboxb5f00e6ffa8c488aa5b15c1e373dd6c4.mailgun.org>",
              "to": "{0} <{1}>".format(name,email),
              "subject": "Welcome to the Warsjawa speakers group!",
              "text": "Hello,\n To complete data with your profile visit: http://warjsawa.pl/speakers/{0}. \n Cheers,\n Warsjawa Team".format(key)})