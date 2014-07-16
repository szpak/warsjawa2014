import requests
import os

def send_new_speaker_email(name, email, key):
    return requests.post(
        "https://api.mailgun.net/v2/sandboxb5f00e6ffa8c488aa5b15c1e373dd6c4.mailgun.org/messages",
        auth=("api", os.environ.get('MAILGUN_API_KEY')),
        data={"from": "Warsjawa <postmaster@system.warsjawa.pl>",
              "to": "{0} <{1}>".format(name,email),
              "subject": "Welcome to the Warsjawa speakers group!",
              "text": u"Hello,\n To complete admission process, visit: http://warjsawa.pl/speakers/{0} \n You can fill your bio and workshop description. \n\n Cheers,\n Warsjawa Team".format(key)})