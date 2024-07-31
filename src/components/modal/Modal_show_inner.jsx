import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { getShow_Ep } from '../../api/api';
import close_svg from './../../assets/images/close.svg';
import player_play from './../../assets/images/player_play.svg';
import player_stop from './../../assets/images/player_stop.svg';
import { deleteUserShow,saveEpForUser,removeEpForUser,getUserSaveEp} from '../../api/api';
import { delete_firebase_show } from '../../api/firebase';
import { AppContext } from '../../store/AppProvider';

const Modal_show_inner = (props)=>{
    const { playerEpItem, setPlayerEpItem }  = useContext(AppContext);
    const { player_state, setPlayer_state }  = useContext(AppContext);
    const {setIsClose} = useContext(AppContext);
    const token = localStorage.getItem("accessToken");
    const [color, setColor] = useState('red');
    const [isSave,setIsSave] = useState(false);
    const [ ep_list,setEp_list] = useState([]);
    const [ save_ep_list, setSave_ep_list] = useState(null);
    const [save_id_list,setSave_id_list] = useState([]);
    let save=0;
    useEffect(()=>{
        let saveEp = getSaveEp_list(token);
        console.log("init");
    },[])
    useEffect(()=>{
        console.log(save_ep_list);
        if(Array.isArray(save_ep_list))
        {
            console.log("save id start");
            saveEp_id_list();
        }
    },[save_ep_list])
    useEffect(()=>{
        //console.log(props.show.show.id);
        getEp_list(token,props.show.show.id);
        getUserSaveEp(token);
    },[props.show])
     async function getEp_list(token,show_id){
        let result = await getShow_Ep(token,show_id);
        console.log(result.episodes.items);
        setEp_list(result.episodes.items);
    }
    async function getSaveEp_list(token){
        let result = await getUserSaveEp(token);
        console.log(result);
        setSave_ep_list(result.items);
    }
    const player_playing = (play_ep) =>{
        setIsClose(false);
        setPlayerEpItem(play_ep);
        setPlayer_state('playing');
    }
    const saveEp_id_list=()=>{
        let epList = [];
        
        console.log(save_ep_list);

            for(let i=0 ; i< save_ep_list.length;i++){
                {epList.push(save_ep_list[i].episode.id);}
            }
        setSave_id_list(epList);
    }
    const Modal_Close=()=>{
        props.onClose("show_more",false);
    }
    async function handle_bookmark_click(token,ep_id){
        console.log(token,ep_id);
        let result = await axios.put(`https://api.spotify.com/v1/me/episodes`,{
            ids:[ep_id]
        },{
            headers: { Authorization: `Bearer ${token}`},
        }).then(res=>{
            getSaveEp_list(token);
        }).catch(err=>{
            console.log(err);
        })
    }
    async function handle_bookmark_click_delete(token,ep_id){
        console.log(token,ep_id);
        let result = await axios.delete(`https://api.spotify.com/v1/me/episodes?ids=${ep_id}`,{
            headers: { 'Authorization': `Bearer ` + token},
        }).then(res=>{
            getSaveEp_list(token);
        }).catch(err=>{
            console.log(err);
        })      
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
    function millisecondsToTime(ms) {
        // 確保輸入為數字
        if (typeof ms !== 'number') {
          return 'Invalid input';
        }
      
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
      
        const remainingSeconds = seconds % 60;
        const remainingMinutes = minutes % 60;
        if(hours===0){
            return `${remainingMinutes}分鐘 ${remainingSeconds}秒`;
        }
        else{
        return `${hours}小時 ${remainingMinutes}分鐘 ${remainingSeconds}秒`;
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
                <div className="sm:grid sm:grid-cols-5 gap-4 mt-3 sm:mt-0 px-4  sm:text-left mb-[8px]">
                    <div className="sm:col-span-1 ">
                        <div className="border-[1px]  mb-[8px] rounded-[11px]">
                        <img className="rounded-[11px]" src={props?.show?.show?.images[1]?.url}></img>
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <div className="flex justify-between p-[5px] border-b-[2px]">
                            <h3
                                className="text-lg leading-6 font-medium text-gray-900" 
                                id="modal-headline"
                                style={{fontFamily:'Noto Sans TC'}}
                            >
                                {props?.show?.show?.name}
                            </h3>
                            <button className="absolute sm:relative top-[5px] right-[5px]"onClick={Modal_Close}><img src={close_svg}></img></button>
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
                    <div className="ep-card-content flex flex-col p-[16px] ">
                        {
                           typeof ep_list === 'object' &&(
                            ep_list.map((ep,key)=>{
                                return(
                                    <div key={key} className="sm:grid sm:grid-cols-5 p-[16px] border-[1px] rounded-[16px] mb-[16px]">
                                        <div className="sm:col-span-1 p-[4px]">
                                            <div>
                                            <div className="hidden sm:block rounded-[11px] flex items-center">
                                            <img className=" border-[1px] rounded-[11px]" src={ep?.images[1]?.url}></img>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <div className="sm:flex justify-between items-center p-[5px]">
                                                <div className="text-lg leading-6 font-medium text-gray-900">{ep.name}</div>
                                                {/* <div onClick={(e)=>{handle_bookmark(ep.id)}}> */}
                                                <div className=" hidden sm:block bottom-[10px]">
                                                 {/* bookmarksvg */}
                                                 {/* {
                                                     save_id_list.includes(ep.id)? 
                                                    (<i  onClick={(e)=>{handle_bookmark_click_delete(token,ep.id)}} className="sm:block fas fa-bookmark  text-[#fe7f50] text-[20px]"></i>):
                                                    (<i  onClick={(e)=>{handle_bookmark_click(token,ep.id)}} className="sm:block far fa-bookmark  text-[#fe7f50] text-[20px]"></i>)
                                                 } */}
                                                </div>
                                            </div>  
                                            <div>
                                                <div className="text-[#718096] p-[2px] font-sans  text-hidden-inner mb-[15px]">{ep.description}</div>
                                                <div className="flex items-center">
                                                    <button  onClick={(e)=>{player_playing(ep)}}className="mr-[5px]">
                                                        {
                                                            (player_state==="playing" && ep.id === playerEpItem.id)  ?
                                                            (<img src={player_stop}></img>):
                                                            (<img src={player_play}></img>)
                                                        }
                                                        
                                                    </button>
                                                    <div className=" p-[2px] mr-[5px]">{ep.release_date}</div>
                                                    <div className="">{millisecondsToTime(ep.duration_ms)}</div>
                                                    {
                                                     save_id_list.includes(ep.id)? 
                                                    (<i  onClick={(e)=>{handle_bookmark_click_delete(token,ep.id)}} className="absolute right-[35px]  sm:hidden fas fa-bookmark  text-[#fe7f50] text-[20px]"></i>):
                                                    (<i  onClick={(e)=>{handle_bookmark_click(token,ep.id)}} className="absolute right-[35px]  sm:hidden m far fa-bookmark  text-[#fe7f50] text-[20px]"></i>)
                                                    }
                                                </div>
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