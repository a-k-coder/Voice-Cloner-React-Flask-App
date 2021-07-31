import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

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
      result: '',
      output_pathstr: ''
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
//     alert('formData before: ' + JSON.stringify(formData));
//     alert('name: ' + name )
//     alert('value: ' + value)
    formData[name] = value;
//     alert('formData: ' + JSON.stringify(formData));
    this.setState({
      formData
    });
//     alert('formData after: ' + JSON.stringify(this.state.formData));
  }
  
  handleChangeFile = (event) => {
    this.setState({ fileToBeSent: event.target.files[0] });
    const n = "input_filename";
    const v = (event.target.files[0]).name;
//     alert('name: ' + n)
//     alert('value: ' + v)
    var fD = this.state.formData;
//     alert('formData before: ' + JSON.stringify(fD));
    fD[n] = v;
//     alert('fD: ' + JSON.stringify(fD));
    this.setState({
      fD
    });
//     alert('formData after: ' + JSON.stringify(this.state.formData));
  }

  handleSubmitTextClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://localhost:5000/voicecloner/print', 
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
    fetch('http://localhost:5000/voicecloner/upload', 
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


  handleCloneClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true,
                  result: 'Voice cloning in progress ...'
                  });
    fetch('http://localhost:5000/voicecloner/clone', 
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
          output_pathstr: response.output_pathstr,
          isLoading: false
        });
      });
  }
  
  handlePlaySound = (event) => {
    let path = "http://localhost:8000/" + this.state.output_pathstr
    let audio = new Audio(path);
    audio.play()
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    
    
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
                <Form.Label>2. Upload voice sample to be cloned [.m4a, .mp4, .wav].</Form.Label>
                <input 
                  type="file" 
                  name="inputvoicefile"
                  onChange={this.handleChangeFile} />
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
                  disabled={isLoading}
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
