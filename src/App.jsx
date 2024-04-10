import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        setTranscript((prevTranscript) => prevTranscript + ' ' + lastResult[0].transcript.trim());
      }
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    
    return () => recognition.stop();
  }, [isListening]);

  return (
    <div>
      <h1>Speech Recognition</h1>
      <button onClick={() => {
        if (!isListening) {
          setTranscript(''); // Reset transcript when starting
        }
        setIsListening((prevState) => !prevState);
      }}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <h2>{transcript}</h2>
    </div>
  );
}

export default App
