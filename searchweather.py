import requests
from flask import request, Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['DEBUG']=True

def getplace(key,query):
    try:
        param = {
            'key':key,
            'query':query
        }
        url = 'http://localhost:1234/search'
        res = requests.get(url, params=param)
        return res.json()
    except Exception as e:
        ret = {
            "error" : e,
            "message" : "The Place Could Not Be Found",
            "status": "ERROR"
        }
        return ret

def getweather(lat,lon):
    try:
        param = {
            'lat':lat,
            'lon':lon
        }
        url = 'http://localhost:5000/weather'
        res = requests.get(url, params=param)
        return res.json()
    except Exception as e:
        ret = {
            "error" : e,
            "message" : "The Weather Could Not Be Found",
            "status": "ERROR"
        }
        return ret

def getforecast(lat,lon):
    try:
        param = {
            'lat':lat,
            'lon':lon
        }
        url = 'http://localhost:5000/forecast'
        res = requests.get(url, params=param)
        return res.json()
    except Exception as e:
        ret = {
            "error" : e,
            "message" : "The Forecast Could Not Be Found",
            "status": "ERROR"
        }
        return ret

@app.route('/weather', methods=['GET'])
def index():
    if request.method == 'GET' :
        data= getplace(request.args.get('key'),request.args.get('query'))
        print(data["status"])
        if (data["status"]=='OK'):
            lat = data["result"]["geometry"]['location']['lat']
            lon = data["result"]["geometry"]['location']['lng']
            res = getweather(lat,lon)
            return jsonify(res)
        else:
            return jsonify(data)

@app.route('/forecast', methods=['GET'])
def home():
    if request.method == 'GET' :
        data= getplace(request.args.get('key'),request.args.get('query'))
        if (data["status"]=='OK'):
            lat = data["result"]["geometry"]['location']['lat']
            lon = data["result"]["geometry"]['location']['lng']
            res = getforecast(lat,lon)
            return jsonify(res)
        else:
            return jsonify(data)

if __name__ == "__main__":
    app.run(port=5001)