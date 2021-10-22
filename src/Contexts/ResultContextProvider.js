import React, {createContext, useContext, useState} from "react";

 const ResultContext = createContext();
 const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';


 
 const ResultContextProvider = ({children}) => {
     const [results, setResults] = useState([]);
     const [loading, setLoading] = useState(false);
     const [searchTerm, setSearchTerm] = useState('Elon Musk');

     const getResults= async(type)=>{
          setLoading(true);
        const res = await fetch(`${baseUrl}${type}`,{
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'google-search3.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_API_KEY,
              },
        });
        // console.log(res);
        const data = await res.json();

        if (type.includes('/news')){
          setResults(data.entries);
        }else if (type.includes('/images')){
          setResults(data.image_results);
        }else {
          setResults(data.results);
        }
       console.log(data);
       
        setLoading(false);
     }
     return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
          {children}
        </ResultContext.Provider>
      );
 }
 export const useStateContext = () => useContext(ResultContext);
 export default ResultContextProvider
 