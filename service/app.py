from flask import Flask, request, jsonify, make_response, flash, redirect, url_for
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import os
from werkzeug.utils import secure_filename

flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Voice Cloner Flask API", 
		  description = "Clone your own voice")

app.secret_key= "QWERTYUIOP"

name_space = app.namespace('voicecloner', description='hi')

model = app.model('Print params', 
				  {'textField1': fields.String(required = True, 
				  							   description="Text Field 1", 
    					  				 	   help="Text Field 1 cannot be blank")})

UPLOAD_FOLDER = 'C:\\Users\\Aruna\\Desktop\\Springboard\\Curriculum\\21\\21.5\\ML-React-App-Template\\ML-React-App-Template\\ui\\src\\resources\\input'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','wav','mp3','m4a'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# classifier = joblib.load('classifier.joblib')

@name_space.route("/print")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			# prediction = classifier.predict(data)
			response = jsonify({
				"statusCode": 200,
				"status": "Print complete",
				"result": "Text: " + str(data)
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})

@name_space.route("/upload")
class MainClass(Resource):
	
	

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

# 	@app.expect(model)		
# 	def post(self):
# 		try: 
# 			file = request.files['file']
# 			print(file)
# 			return "done"
			
# 		except Exception as error:
# 			return jsonify({
# 				"statusCode": 500,
# 				"status": "Could not make prediction",
# 				"error": str(error)
# 			})
	def post(self):
		
		def allowed_file(filename):
		        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
		
		if request.method == 'POST':
			# check if the post request has the file part
			if 'file' not in request.files:
# 				flash('No file part')
				print('PRINT 1: No file part')
				return redirect(request.url)
			file = request.files['file']
			print("PRINT 2: file = request.files['file'] done")
			# If the user does not select a file, the browser submits an empty file without a filename.
			if file.filename == '':
# 				flash('No selected file')
				print('PRINT 3: No selected file')
				return redirect(request.url)
			if file and allowed_file(file.filename):
				print("PRINT 4: file and allowed_file(file.filename): OK")
				filename = secure_filename(file.filename)
				print("PRINT 5: secure_filename: OK")
				file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
				print('PRINT 6: file.save worked')
				response = jsonify({
				"statusCode": 200,
				"status": "Upload complete",
				"result": "Upload complete"
				})
				response.headers.add('Access-Control-Allow-Origin', '*')
			return redirect(url_for('download_file', name=filename))
		return response
# 		'''
# 		<!doctype html>
# 		<title>Upload new File</title>
# 		<h1>Upload new File</h1>
		
#     		<form method=post enctype=multipart/form-data>
# 		<input type=file name=file>
#       	<input type=submit value=Upload>
#     		</form>
#     		'''
		
# @name_space.route("/saveaudio")
# class MainClass(Resource):

# 	def options(self):
# 		response = make_response()
# 		response.headers.add("Access-Control-Allow-Origin", "*")
# 		response.headers.add('Access-Control-Allow-Headers', "*")
# 		response.headers.add('Access-Control-Allow-Methods', "*")
# 		return response

# 	@app.expect(model)		
# 	def post(self):
# 		try: 
# 			formData = request.json
# 			data = [val for val in formData.values()]
# 			# prediction = classifier.predict(data)
# 			response = jsonify({
# 				"statusCode": 200,
# 				"status": "Print complete",
# 				"result": "Uploaded " + str(data)
# 				})
# 			response.headers.add('Access-Control-Allow-Origin', '*')
# 			return response
# 		except Exception as error:
# 			return jsonify({
# 				"statusCode": 500,
# 				"status": "Could not save audio.",
# 				"error": str(error)
# 			})

