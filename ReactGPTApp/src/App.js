import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";


function App() {
    const [message, setMessage] = useState('');


    const loadMessage = async () => {
        const result = await axios.get("http://localhost:8080/bot/chat?content=" + inputText)
        result.data.map((choice) => setMessage(choice.message))
    }

    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
  
    const handleInputChange = (e) => {
      setInputText(e.target.value);
    };

    useEffect(() => {
      setResponseText(message.content)
    }, [message]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Ask me anything</h1>
          <input
            type="text"
            style={{ color: 'black' }}
            placeholder="Type something..."
            value={inputText}
            onChange={handleInputChange}
          />
          <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={loadMessage}>Make API Call</button>
          <p>{responseText}</p>
      </div>
      </header>
    </div>
  );
}

export default App;
