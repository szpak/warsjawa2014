import requests
import os

def send_new_speaker_email(name, email, key, committeeMemberEmail):
    return requests.post(
        "https://api.mailgun.net/v2/system.warsjawa.pl/messages",
        auth=("api", os.environ.get('MAILGUN_API_KEY')),
        data={"from": "Warsjawa <postmaster@system.warsjawa.pl>",
              "to": "{0} <{1}>".format(name,email),
              "cc": "{0}".format(committeeMemberEmail),
              "subject": "Welcome to the Warsjawa speakers group!",
              "text": u"Hello,\n To complete admission process, visit: http://warjsawa.pl/speakers/{0} \n You can fill your bio and workshop description. \n\n Cheers,\n Warsjawa Team".format(key)})