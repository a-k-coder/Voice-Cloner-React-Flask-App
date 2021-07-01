import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
// import axios from 'axios';
// import soundfile from 'C:\\Users\\Aruna\\Desktop\\Springboard\\Curriculum\\21\\21.5\\ML-React-App-Template\\ML-React-App-Template\\ui\\src\\resources\\output\\test1.mp3';
// import Sound from 'react-sound';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fileToBeSent: null,
      formData: {
        input_text: '',
        input_filename: ''
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }
  
  onChangeFile = (event) => {
    this.setState({ fileToBeSent: event.target.files[0] });
    const n = 'input_filename';
    const v = (event.target.files[0]).filename;
    var fD = this.state.formData;
    alert('formData before: ' + JSON.stringify(fD));
    fD[n] = v;
    alert('fD: ' + JSON.stringify(fD));
    this.setState({
      fD
    });
    alert('formData after: ' + JSON.stringify(this.state.formData));
  }

  handleSubmitTextClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/voicecloner/print', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }
  
  handleUploadClick = (event) => {
    let file = this.state.fileToBeSent;
    const formData = new FormData();
    formData.append("file", file);
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/voicecloner/upload', 
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

//   uploadFile = (event) => {
//   event.preventDefault();
//   let file = this.state.fileToBeSent;
//   const formData = new FormData();
//   const headers = {
//   "Access-Control-Allow-Origin": "*",
//   };

//   formData.append("file", file);
     
//   axios
//     .post("http://127.0.0.1:5000/voicecloner/upload", formData, 
//           {
//             headers: headers
//           })
//     .then(res => console.log(res))
//     .catch(err => console.warn(err));
//   }

  handleCloneClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/voicecloner/print', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }
  
  handlePlaySound = (event) => {
    let path = 'https://docs.google.com/uc?export=download&id=1PLTUHZqUPp_xbi4qiTwycgnkS12GpCT0'
    let audio = new Audio(path);
    audio.play()
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    
    
//     var path = 'C:\\Users\\Aruna\\Desktop\\Springboard\\Curriculum\\21\\21.5\\ML-React-App-Template\\ML-React-App-Template\\ui\\src\\resources\\output\\test1.mp3';
//     var path = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
//     var path = 'https://drive.google.com/file/d/1PLTUHZqUPp_xbi4qiTwycgnkS12GpCT0/view';
    
    

    return (
      <Container>
        <div>
          <h1 className="title">Voice Cloner</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>1. Type something to say</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder = "Up to 20 words"
                  name="input_text"
                  value={formData.input_text}
                  onChange={this.handleChange} />
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handleSubmitTextClick : null}>
                  { isLoading ? 'Submitting' : 'Submit text' }
                </Button>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>2. Upload voice sample to be cloned [.mp3, .m4a, .mp4, .wav].</Form.Label>
                <input 
                  type="file" 
                  name="inputvoicefile"
                  onChange={this.onChangeFile} />
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handleUploadClick : null}>
                  { isLoading ? 'Uploading' : 'Upload voice sample' }
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
      </div>
      <div className="content">
         <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCloneClick}>
                  Clone voice
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Button id="audio-button" 
                  block
                  onClick={this.handlePlaySound}>
                  Play sound
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
      </Container> 
    );
  }
}

export default App;
