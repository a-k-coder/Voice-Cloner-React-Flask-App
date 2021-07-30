# Voice-Cloner-React-Flask-App
This Voice Cloner React app call connects to a Flask backend and a voice cloner ML Python code to clone a short voice input. This app is built by modifying the excellent template provided [here](https://github.com/kb22/ML-React-App-Template).

### Usage
Download pretrained models from [here](https://github.com/CorentinJ/Real-Time-Voice-Cloning/wiki/Pretrained-models)

#### Run from terminal / command line
Commands for React app. <br>
In the command line, navigate to folder ui and run the following commands in sequence: <br>
npm run build <br>
serve -s build -l 3000 <br>

Commands for Flask. In a different command prompt, navigate to folder service and run the following commands in sequence: <br>
virtualenv -p Python3 . <br>
activate <br>
pip install -r requirements.txt <br>
pip install -r requirements_ml.txt <br>
set FLASK_APP=app.py <br>
flask run <br>

Commands for hosting local server. In a third command prompt, navigate to folder containing the output file and run the following: <br>
python -m http.server

#### Build and run Docker container
Download pretrained models from [here](https://github.com/CorentinJ/Real-Time-Voice-Cloning/wiki/Pretrained-models)

#### Download and run Docker image
