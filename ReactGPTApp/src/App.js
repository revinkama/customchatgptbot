import logo from './logo.svg';
import mic from './microphone-342.svg'
import stop from './stop-circle-outline.svg'
import clear from './icons8-clear-48.png'
import submit from './icons8-submit-48.png'
import './App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function App() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
      setResponseText(message.content)
    }, [message]);

    
    const loadMessage = async () => {
        setIsLoading(true);
        const result = await axios.get("http://localhost:8080/api/v1/chat?content=" + inputText)
        result.data.map((choice) => setMessage(choice.message))
        setIsLoading(false);
    }

    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [width, setWidth] = useState('');


    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    useEffect(() => {
      setResponseText('')
    }, [transcript]);

    useEffect(() => {
      setInputText(transcript)
    }, [transcript]);

    const [voiceText, setVoiceText] = useState('');
  
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    const stopListening = () => SpeechRecognition.stopListening();
  
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
    const handleInputChange = (e) => {
      let currentWidth;
      currentWidth = e.target.scrollWidth - 5;
      setWidth(currentWidth);  
      setInputText(e.target.value);
    };

   

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Ask me anything</h1>
          <input
            type="text"
            className='input-text'
            placeholder="Type or record something..."
            value={inputText ? inputText : transcript}
            onChange={handleInputChange}
          />
          <div>
            <button onClick={startListening} style={{ backgroundColor: 'green', color: 'white', marginRight: 10, backgroundImage: `url(${mic})`,
          backgroundSize: '40px 40px', backgroundRepeat: 'no-repeat', justifyContent: 'center', justifyItems: 'center', width: '15%', height: '50px' }} />
            <button onClick={stopListening} style={{ backgroundColor: 'red', color: 'white', marginRight: 10, backgroundImage: `url(${stop})`,
          backgroundSize: '40px 40px', backgroundRepeat: 'no-repeat', justifyContent: 'center', justifyItems: 'center', width: '15%', height: '50px' }} />
            <button onClick={resetTranscript} style={{ backgroundColor: 'yellow', color: 'white', marginRight: 10,  backgroundImage: `url(${clear})`,
          backgroundSize: '40px 40px', backgroundRepeat: 'no-repeat', justifyContent: 'center', justifyItems: 'center', width: '15%', height: '50px',  }} />
            <button style={{ backgroundColor: 'blue', color: 'white', backgroundImage: `url(${submit})`,
          backgroundSize: '40px 40px', backgroundRepeat: 'no-repeat', justifyContent: 'center', justifyItems: 'center', width: '15%', height: '50px' }} onClick={loadMessage} />
          {listening && <p>Make sure to click stop when finished</p>}
          </div>
          {isLoading ? <p> Loading... </p> : <p>{responseText}</p>}
      </div>
      </header>
    </div>
  );
}

export default App;
