import { createContext,useReducer } from "react";

const Modal_reducer = (state,action)=>{
    switch(action.type){
        case 'OPEN_MORE_MODAL':
            return{
                ...state,
                more_show:action.payload,
                more_modal_open:true,
            }
        default:
            return state;
    }
};
// const GalleryProvider = ({children})=>{
//     const [state,dispatch] = useReducer(Modal_reducer,default_state);
//     return(
//        <GalleryContext.Provider value={{state,dispatch}}>
//             {children}
//         </GalleryContext.Provider>
//     )
// }
export const GalleryContext= createContext({});

