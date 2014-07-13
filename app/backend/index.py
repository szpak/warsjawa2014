from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/speakers')
def test_json():
    speakers = [
        {
            'name': 'Venkat Subramaniam',
            'picture_url': 'static/images/speakers/venkat-subramaniam-320x320.jpg'
        },
        {
            'name': 'Konrad Malawski',
            'picture_url': 'static/images/speakers/konrad-malawski-320x320.jpg'
        }
    ]
    return jsonify(speakers = speakers)

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=81,debug=True)
