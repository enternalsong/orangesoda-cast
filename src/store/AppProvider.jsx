import { createContext,useState } from "react";

export const AppContext = createContext();

export const AppProvider=({children})=>{
    const [ playerEpItem, setPlayerEpItem] = useState(null);
    const [ player_state, setPlayer_state ] = useState('stop');
    const [ isDark_mode,setIsDark_mode] = useState(false);
    const [ username,setUsername] = useState('');
    const [isClose, setIsClose] = useState(false);
    return(
        <AppContext.Provider value={{playerEpItem,setPlayerEpItem , 
            player_state,setPlayer_state,
            isDark_mode,setIsDark_mode ,
            username,setUsername,
            isClose, setIsClose,

        }}>
            {children}
        </AppContext.Provider>
    )
}