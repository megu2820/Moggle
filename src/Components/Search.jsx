import React , { useEffect, useState }from 'react'
import Links from './Links'
import { useStateContext } from '../Contexts/ResultContextProvider';
import { useDebounce } from 'use-debounce';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Search = () => {
 
    const { setSearchTerm } = useStateContext();
    const [text, setText] = useState('Elon Musk');
    const [debouncedValue] = useDebounce(text, 500);
    
   const [islistening, setIsListening] = useState(false);
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
      console.log('Voice search not supported in this browser');
    }
  
   
    
    useEffect(() => {
      if(islistening) {
        resetTranscript();
        setText('');
      
        SpeechRecognition.startListening({
        continuous: true,
       
      }); }
      else {
        SpeechRecognition.stopListening();
      if(transcript){  setText(transcript);
        console.log(transcript);}
      // resetTranscript();
      }
      
    }, [islistening])
    useEffect(() => {
      if (debouncedValue) setSearchTerm(debouncedValue);
      
      
    }, [debouncedValue]);
 
   
  
 
    return (
        <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input id = "search-input"
        value={text}
        type="text"
        className="sm:w-96 w-80 h-10 dark:bg-gray-200  border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        placeholder="🔎 Search Moogle or type URL"
        onChange={(e) => setText(e.target.value)}
      >
        
      </input>
     
      
      
      {text ? (
  <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={() => { setText('')}}>
    x
  </button>
): ( <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={()=>setIsListening(prevState=> !prevState)}

>
     {islistening? '🛑': '🎙️'} 
  </button>)  }
      <Links />
    </div>
    )
}
/*
{text ? (
  <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={() => { setText('')}}>
    x
  </button>
): ( <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={()=>setIsListening(prevState=> !prevState)}

>
     {islistening? '🛑': '🎙️'} 
  </button>)  }*/

export default Search
