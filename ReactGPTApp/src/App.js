import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
      setResponseText(message.content)
    }, [message]);

    const loadMessage = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/chat?content=" + inputText)
        result.data.map((choice) => setMessage(choice.message))
    }

    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    const [voiceText, setVoiceText] = useState('');
  
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    const stopListening = () => SpeechRecognition.stopListening();
  
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
    const handleInputChange = (e) => {
      setInputText(e.target.value);
    };

   

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Ask me anything</h1>
          <input
            type="text"
            style={{ color: 'black', padding: 15  }}
            placeholder="Type something..."
            value={inputText ? inputText : transcript}
            onChange={handleInputChange}
          />
          <div>
            <button onClick={startListening} style={{ backgroundColor: 'green', color: 'white' }}> Start listening </button>
            <button onClick={stopListening} style={{ backgroundColor: 'red', color: 'white' }}> Stop listening </button>
            <button onClick={resetTranscript} style={{ backgroundColor: 'black', color: 'white' }}> Reset Input </button>
            <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={loadMessage}>Make API Call</button>
          </div>
          <p>{responseText}</p>
      </div>
      </header>
    </div>
  );
}

export default App;
