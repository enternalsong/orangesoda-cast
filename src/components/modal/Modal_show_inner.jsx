import { useState,useEffect,useContext } from 'react';
import { getShow_Ep } from '../../api/api';
import close_svg from './../../assets/images/close.svg';
import Bookmark_Icon from '../Icon/Bookmark_Icon';

import { deleteUserShow,saveEpForUser} from '../../api/api';
import { delete_firebase_show } from '../../api/firebase';
const Modal_show_inner = (props)=>{
    const token = localStorage.getItem("accessToken");
    const [color, setColor] = useState('red');
    const [isSave,setIsSave] = useState(false);
    const [ ep_list,setEp_list] = useState([]);
    useEffect(()=>{
        //console.log(props.show.show.id);
        getEp_list(token,props.show.show.id);
    },[props.show])
     async function getEp_list(token,show_id){
        let result = await getShow_Ep(token,show_id);
        //console.log(result.episodes.items);
        setEp_list(result.episodes.items);
    }
    const Modal_Close=()=>{
        props.onClose("show_more",false);
    }
    const handle_bookmark_click = (ep_id,isSave)=>{
        console.log('hurthurt');
        if(!isSave){
            setColor('#ff9f7d')
        }
        else{
            setColor('none');
        }
    }
    const handleDeletePtArray=(arr,index)=>{
        if(index===0){
            return [""]
        }
        else{
            arr.splice(index,1);

            return arr
        }
    }
    const handleDelete =()=>{
        let save_array = props.cg_open[Object.keys(props.cg_open)]
        save_array = handleDeletePtArray(save_array,props.show_index);
        //console.log(save_array);
        if(props.cg_index ===0){
            //spotify
            if(props.show_index!==0)
            {
            deleteUserShow(token,props.show.show.id);
            //firebase
            delete_firebase_show(props.userId, props.cg_open,save_array,props.cg_index);
            props.oncgUpdate("show_more",false);
            }
        }
        else{
            delete_firebase_show(props.userId, props.cg_open,save_array,props.cg_index);
            props.oncgUpdate("show_more",false);
        }
    }
    return(
        <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={Modal_Close}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block align-bottom w-[500px] bg-white rounded-lg text-left overflow-hidden sm:max-w-[52rem] shadow-xl transform transition-all  sm:my-8 sm:align-middle sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="  bg-white  pt-5 pb-4  sm:pb-4">
                <div className="grid grid-cols-5 gap-4 mt-3 sm:mt-0 px-4  sm:text-left mb-[8px]">
                    <div className="col-span-1 ">
                        <div className="border-[1px]  mb-[8px] rounded-[11px]">
                        <img className="rounded-[11px]" src={props.show.show.images[1].url}></img>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="flex justify-between p-[5px] border-b-[2px]">
                            <h3
                                className="text-lg leading-6 font-medium text-gray-900" 
                                id="modal-headline"
                                style={{fontFamily:'Noto Sans TC'}}
                            >
                                {props.show.show.name}
                            </h3>
                            <button onClick={Modal_Close}><img src={close_svg}></img></button>
                        </div>
                            <div className="text-[#93989A] text-[12px] p-[4px]">{props.show.show.publisher}</div>
                            <div className="text-[#718096] p-[2px]">{props.show.show.description}</div>
                            <div className="flex flex-row-reverse">
                                <div onClick={(e)=>{handleDelete()}}className="py-[4px] px-[8px] justify-center border-[1px] border-[#FF5050] hover:bg-[#FF5050] rounded-[4px]">刪除
                                </div>
                            </div>
                    </div>
                </div>
                <div className="border-[1px] "></div>
                <div className="mt-2">
                    <div className="flex flex-col p-[16px] ">
                        {
                           typeof ep_list === 'object' &&(
                            ep_list.map((ep,key)=>{
                                return(
                                    <div key={key} className="grid grid-cols-5 p-[16px] border-[1px] rounded-[16px] mb-[16px]">
                                        <div className="col-span-1 p-[4px]">
                                            <div>
                                            <div className=" rounded-[11px] flex items-center">
                                            <img className="w-[118px] h-[118px] border-[1px] rounded-[11px]" src={ep.images[1].url}></img>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <div className="flex justify-between items-center p-[5px]">
                                                <div className="text-lg leading-6 font-medium text-gray-900">{ep.name}</div>
                                                {/* <div onClick={(e)=>{handle_bookmark(ep.id)}}> */}
                                                <div >
                                                 {/* bookmarksvg */}
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill='red' xmlns="http://www.w3.org/2000/svg" onClick={(e)=>{handle_bookmark_click(ep.id,isSave)}}>
                                                        <g id="Bookmark" clipPath="url(#clip0_38_14)">
                                                        <path id="Vector" d="M14.1666 2.5H5.83329C4.91663 2.5 4.16663 3.25 4.16663 4.16667V17.5L9.99996 15L15.8333 17.5V4.16667C15.8333 3.25 15.0833 2.5 14.1666 2.5Z" fill="none" stroke="#FF7F50" strokeWidth="2"/>
                                                        </g>
                                                        <defs>
                                                        <clipPath id="clip0_38_14">
                                                        <rect width="20" height="20" fill="white"/>
                                                        </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[#718096] p-[2px] ">{ep.description}</div>
                                            </div>
                                        </div>      
                                    </div>
                                )
                            })
                           )
                        }
                    </div>

                </div>
            </div>

          </div>
        </div>
    </div>
    )
}

export default Modal_show_inner