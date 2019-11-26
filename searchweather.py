import requests
from flask import request, Flask, jsonify

app = Flask(__name__)
app.config['DEBUG']=True


def getplace(key,query):
    try:
        param = {
            'key':key,
            'query':query
        }
        url = 'http://localhost:1234/geometry'
        res = requests.get(url, params=param)
        return res.json()
    except Exception as e:
        res = "The Place Could Not Be Found" + e
        return res

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
        res = "The Weather Could Not Be Found" + e
        return res

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
        res = "The Forecast Could Not Be Found" + e
        return res

@app.route('/weather', methods=['GET'])
def index():
    if request.method == 'GET' :
        data= getplace(request.args.get('key'),request.args.get('query'))
        lat = data['location']['lat']
        lon = data['location']['lng']
        res = getweather(lat,lon)
        return jsonify(res)

@app.route('/forecast', methods=['GET'])
def home():
    if request.method == 'GET' :
        data= getplace(request.args.get('key'),request.args.get('query'))
        lat = data['location']['lat']
        lon = data['location']['lng']
        res = getforecast(lat,lon)
        return jsonify(res)

# AIzaSyCxQy3DFnDxNh3D_E8c0c1rrno_U_lzTcQ

if __name__ == "__main__":
    app.run(port=5001)