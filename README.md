# Voice-Cloner-React-Flask-App
This Voice Cloner React app call connects to a Flask backend and a voice cloner ML Python code to clone a short voice input. This app is based on the excellent ML code provided [here](https://github.com/CorentinJ/Real-Time-Voice-Cloning) and built by modifying the excellent React + Flask template provided [here](https://github.com/kb22/ML-React-App-Template) with help on Docker from [this tutorial](https://blog.miguelgrinberg.com/post/how-to-dockerize-a-react-flask-project).



### Usage

#### Run from terminal / command line
For instructions on how to download pretrained models go [here](https://github.com/CorentinJ/Real-Time-Voice-Cloning/wiki/Pretrained-models).
Commands for React app. <br>
In the command line, navigate to folder ui and run the following commands in sequence: <br>
> npm run build <br>
> serve -s build -l 3000 <br>

Commands for Flask. In a different command prompt, navigate to folder service and run the following commands in sequence: <br>
> git clone https://github.com/a-k-coder/ak-Real-Time-Voice-Cloning <br>
> virtualenv -p Python3 . <br>
> activate <br>
> pip install -r requirements.txt <br>
> pip install -r requirements_ml.txt <br>
> set FLASK_APP=app.py <br>
> flask run <br>

Commands for hosting local server. In a third command prompt, navigate to folder containing the output file (ui/src/resources/Output) and run the following: <br>
> python -m http.server 8000 --bind localhost

Launch the application with http://localhost:3000

#### Build and run Docker container
Download pretrained models from [here](https://github.com/CorentinJ/Real-Time-Voice-Cloning/wiki/Pretrained-models).
Once inside the VM of docker-for-data-science go to cmd. Clone git repos in the home directory
> git clone https://github.com/a-k-coder/Voice-Cloner-React-Flask-App <br>
> cd Voice-Cloner-React-Flask-App/service/ <br>
> git clone https://github.com/a-k-coder/ak-Real-Time-Voice-Cloning <br>

Download pretrained models: https://github.com/CorentinJ/Real-Time-Voice-Cloning/wiki/Pretrained-models

In console in Voice-Cloner-React-Flask-App folder: <br>
> docker build -f Dockerfile_Flask -t dockerflask . <br>
Mounting volume <br>
> docker run -it -p5000:5000 -v input:/app/ui/src/resources/input -v output:/app/ui/src/resources/output dockerflask <br>

In another console in Voice-Cloner-React-Flask-App folder: <br>
> docker build -f Dockerfile_React -t dockerreact . <br>
> docker run -it -p3000:3000 dockerreact

In another console, navigate to Docker/Volumes/output/\_data
> python -m http.server 8000 --bind localhost

Launch the application with http://localhost:3000


#### Download and run Docker image
Download the two Docker images for React UI and Flask API from [here](https://hub.docker.com/repository/docker/akcoder/voicecloner).
In console run Docker image and Mount volume <br>
> docker run -it -p5000:5000 -v input:/app/ui/src/resources/input -v output:/app/ui/src/resources/output dockerflask <br>

In another console in Voice-Cloner-React-Flask-App folder: <br>
> docker run -it -p3000:3000 dockerreact

In another console, navigate to Docker/Volumes/output/\_data
> python -m http.server 8000 --bind localhost

Launch the application with http://localhost:3000

### Credits
[Real Time Voice Cloning by Corentin J](https://github.com/CorentinJ/Real-Time-Voice-Cloning) <br>
[React Flask app template](https://github.com/kb22/ML-React-App-Template) <br>
[How to dockerize a React Flask app](https://blog.miguelgrinberg.com/post/how-to-dockerize-a-react-flask-project)

