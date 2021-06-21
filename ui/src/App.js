import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
// import soundfile from 'C:\\Users\\Aruna\\Desktop\\Springboard\\Curriculum\\21\\21.5\\ML-React-App-Template\\ML-React-App-Template\\ui\\src\\resources\\output\\test1.mp3';
// import Sound from 'react-sound';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        textfield1: ''
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
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/voicecloner/upload', 
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


  handleDownloadClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    
    var path = 'C:\\Users\\Aruna\\Desktop\\Springboard\\Curriculum\\21\\21.5\\ML-React-App-Template\\ML-React-App-Template\\ui\\src\\resources\\output\\test1.mp3';
    var audio = new Audio(path);
    

    return (
      <Container>
        <div>
          <h1 className="title">Voice Cloner</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Type something to say</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder = "Up to 500 characters"
                  name="textfield1"
                  value={formData.textfield1}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handleSubmitTextClick : null}>
                  { isLoading ? 'Submitting' : 'Submit text' }
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handleUploadClick : null}>
                  { isLoading ? 'Uploading' : 'Upload voice sample' }
                </Button>
              </Col>
            </Row>
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
                  onClick={this.handleDownloadClick}>
                  Download
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
                  onClick={() => audio.play()
                  }>
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
