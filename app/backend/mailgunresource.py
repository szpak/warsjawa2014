import requests
import os

def send_new_speaker_email(name, email, key, committeeMemberEmail):
    return requests.post(
        "https://api.mailgun.net/v2/system.warsjawa.pl/messages",
        auth=("api", os.environ.get('MAILGUN_API_KEY')),
        data={"from": "Warsjawa <postmaster@system.warsjawa.pl>",
              "to": u"{0} <{1}>".format(name,email),
              "cc": u"{0}".format(committeeMemberEmail),
              "subject": "Welcome to the Warsjawa speakers group!",
              "text": u"Hello,\nTo complete admission process, visit: http://warjsawa.pl/speakers/{0} \nYou can fill your bio and workshop description.\n\nCheers,\nWarsjawa Team".format(key)})