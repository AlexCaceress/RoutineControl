from flask import Flask
import json

app = Flask(__name__)

file = open("myRoutines.json")
data = json.load(file)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route("/test/")
def test():
    return data

if __name__ == "__main__":
    app.run(debug=True, port=5000)