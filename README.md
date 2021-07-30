# Voice-Cloner-React-Flask-App
This Voice Cloner React app call connects to a Flask backend and a voice cloner ML Python code to clone a short voice input. This app is built by modifying the excellent template provided [here](https://github.com/kb22/ML-React-App-Template).

### Usage
#### Run from terminal / command line
Commands for React app. 
In the command line, navigate to folder ui and run the following commands in sequence:
npm run build 
serve -s build -l 3000

Commands for Flask. In a different command prompt, navigate to folder service and run the following commands in sequence:
virtualenv -p Python3 .
activate
pip install -r requirements.txt
pip install -r requirements_ml.txt
set FLASK_APP=app.py
flask run

Commands for hosting local server. In a third command prompt, navigate to folder containing the output file and run the following:
python -m http.server

#### Build and run Docker container

#### Download and run Docker image
