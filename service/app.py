from flask import Flask, request, jsonify, make_response, redirect, url_for
from flask_restplus import Api, Resource, fields
import os
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from pathlib import Path

import sys
sys.path.append('.\\ak-Real-Time-Voice-Cloning')
sys.path.append('./ak-Real-Time-Voice-Cloning')

import demo_cli

flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Voice Cloner Flask API", 
		  description = "Clone your own voice")


name_space = app.namespace('voicecloner', description='')

model = app.model('Print parameters', 
				  {'input_text': fields.String(required = False, description="Input Text", help="Input text cannot be blank"),
				  'input_filename': fields.String(required = False, description="Input Filename", help="Input voice to be cloned")
				  })

upload_parser = app.parser()
upload_parser.add_argument('file', location='files', type=FileStorage, required=True)


current_cwd = os.getcwd()
print("CWD: ", current_cwd)
parent_dir = os.path.dirname(current_cwd)
print("parent dir: ", parent_dir)

UPLOAD_FOLDER = Path((parent_dir + '/ui/src/resources/input').replace("\'","").replace("\"",""))
print("CWD: ", os.getcwd())
print('UPLOAD_FOLDER: ', UPLOAD_FOLDER)
ALLOWED_EXTENSIONS = {'wav','mp3','m4a','mp4'}



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
				"status": "Could not print",
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
	
	@app.expect(upload_parser)
	def post(self):
		
		def allowed_file(filename):
		        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
		
		if request.method == 'POST':
			# check if the post request has the file part
			if 'file' not in request.files:
# 				flash('No file part')
				print('PRINT 1: No file part')
				response = jsonify({
					"statusCode": 200,
					"status": "No file part",
					"result": "Error: No file uploaded"
				})
				redirect(request.url)
				response.headers.add('Access-Control-Allow-Origin', '*')
				print("PRINT 1: request.url :", request.url)
				return response
			file = request.files['file']
			print("PRINT 2: file = request.files['file'] done")
			# If the user does not select a file, the browser submits an empty file without a filename.
			if file.filename == '':
# 				flash('No selected file')
				print('PRINT 3: No selected file')
				print("PRINT 3: request.url :", request.url)
				return redirect(request.url)
			if file and allowed_file(file.filename):
				print("PRINT 4: file and allowed_file(file.filename): OK")
				filename = secure_filename(file.filename)
				print("PRINT 5: secure_filename: OK")
				file.save(os.path.join(UPLOAD_FOLDER, filename))
				print('PRINT 6: file.save worked')
				response = jsonify({
				"statusCode": 200,
				"status": "Upload complete",
				"result": "Upload complete"
				})
				print('PRINT 7: response jsonify works')
				response.headers.add('Access-Control-Allow-Origin', '*')
				print('PRINT 8: response headers add works')
# 			return redirect(url_for('download_file', name=filename))
		return response
# 		'''

@name_space.route("/clone")
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
			
			arg_text = data[0]
			print('arg_text: ', arg_text)
			print('type arg_text: ', type(arg_text))
			arg_filename = data[1]
			print('arg_filename: ', arg_filename)
			print('type arg_filename: ', type(arg_filename))
			arg_path = os.path.join(UPLOAD_FOLDER, arg_filename)
			
			print('arg_path: ', arg_path)
			print('type arg_path: ', type(arg_path))
			
			
# 			Call ML backend to clone voice
			output_pathstr = demo_cli.voicecloner(arg_path, arg_text)
			print("output_pathstr", output_pathstr)
	
			os.chdir(Path(os.path.dirname(os.getcwd())))
			print("CWD: ", os.getcwd())
			
			response = jsonify({
				"statusCode": 200,
				"status": "Clone complete",
				"result": "Clone complete",
				"output_pathstr" : output_pathstr
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not clone",
				"error": str(error)
			})
