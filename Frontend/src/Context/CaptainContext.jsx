import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();
export const useCaptain=()=>{
  const context=useContext(CaptainDataContext)
  if(!context){
    throw new Error('usecaptain must be used within a captainprovider')
  }
  return context;

}

const CaptainContext = ({ children }) => {
    const [ captain, setCaptain ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);



    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;