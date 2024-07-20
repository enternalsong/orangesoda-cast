import Player from './Player.jsx';
import axios from 'axios';
import { AppContext } from '../../store/AppProvider';
import { useEffect , useState ,useContext} from 'react';
import { GalleryContext } from '../../store/GalleryContext.jsx';
import { getEp ,getUserSaveEp } from '../../api/api.js';
import emptyfolder from './../../assets/images/emptyfolder.png';
import player_play from './../../assets/images/player_play.svg';
import player_stop from './../../assets/images/player_stop.svg';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const Greeting = () => {
    const [greet,setGreet] = useState("");
    const { username,isDark_mode, setIsDark_mode}  = useContext(AppContext)
    useEffect(()=>{
        const hour = new Date().getHours();
        if(hour>=6 && hour <12){
            setGreet(`${username},早安`)
        }else if( hour >=12 && hour < 17){setGreet(`${username},午安`)}
        else if ( hour <=6 || (hour >=17 && hour < 24) ){
            setGreet(`${username},晚安`)
        }
    },[username])  
    return(<>
        {isDark_mode ? 
        (<div className="text-[32px] font-bold text-[white]">
            {greet}
        </div>):
        (<div className="text-[32px] font-bold text-[black]">
            {greet}
        </div>)
        }
</>
    )
}
const MyLoveEp = ()=>{
    const { playerEpItem, setPlayerEpItem }  = useContext(AppContext);
    const { player_state, setPlayer_state }  = useContext(AppContext);
    const token = localStorage.getItem('accessToken');
    const [loveEp,setLoveEp] = useState(null);
    useEffect(()=>{
        let saveEp = getSaveEp_list(token);
        
    },[])

    const player_playing = (play_ep) =>{
        setPlayerEpItem(play_ep);
        setPlayer_state('playing');
    }
    const saveEp_id_list=()=>{
        let epList = [];
        
        console.log(loveEp);

            for(let i=0 ; i< loveEp.length;i++){
                {epList.push(loveEp[i].episode.id);}
            }
        setSave_id_list(epList);
    }
    async function getSaveEp_list(token){
        let result = await getUserSaveEp(token);
        console.log(result);
        setLoveEp(result.items);
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
    if(Array.isArray(loveEp) ){
        if(loveEp.length===0){
        return(
            <div className="flex flex-col items-center justify-center ">
            <img className="w-[60px] h-[60px]" src={emptyfolder}></img>
            <div className="text-[#71809] font-[500] text-[20px] font-sans">你並未收藏任何Podcast</div>
            {/* <div className="text-[#71809] font-[500] text-[18px]">你並未收藏任何Podcast</div> */}
        </div> 
        )
        }
        else{
            return(
                <div>
                {
                loveEp.map((item,key)=>(
                    <div key={key} className="gird grid-colos-12 sm:grid sm:grid-cols-12 gap-4 mb-4 p-3 border-b-[2px]">
                        {
                        <div className="col-span-12 sm:col-span-3">
                           <div className="sm:mx-[12px]"> <img className="rounded-[11px] width-[32px] height-[32px] " src={item?.episode?.images[0].url}></img></div>
                           {/* <div className="hidden sm:flex rounded-[11px]  items-center">
                                <img className="w-[118px] h-[118px] border-[1px] rounded-[11px]" src={item?.episode?.images[1].url}></img>
                            </div> */}
                        </div>
                        }
                        <div className="sm:col-span-9 height-[140px]">
                            <div className="flex justify-between items-center p-[5px]">
                                <h1 className="mb-3 text-[18px]">{item?.episode.name}</h1>
                                <div >
                                                    {/* bookmarksvg */}                       
                                    <i  onClick={(e)=>{handle_bookmark_click_delete(token,item.episode.id)}} className="fas fa-bookmark  text-[#fe7f50] text-[20px]"></i>                  
                                </div>
                            </div>
                            <div className="text-[#71809] font-[500] text-[14px] font-sans text-hidden mb-[15px]">{item?.episode.description}</div>
                            <div className="flex items-center">
                                                    <button  onClick={(e)=>{player_playing(item.episode)}}className="mr-[5px]">
                                                        {
                                                            (player_state==="playing" && item.episode.id === playerEpItem.id)  ?
                                                            (<img src={player_stop}></img>):
                                                            (<img src={player_play}></img>)
                                                        }
                                                    </button>
                                                    <div className=" p-[2px] mr-[5px]">{item.episode.release_date}</div>
                                                    <div className="">{millisecondsToTime(item.episode.duration_ms)}</div>
                                                </div>
                            <div className="playerlist d-flex">
                                <button></button>
                            </div>
                        </div>
                    </div>
                ))
               }  
               </div>
            )

        }
    }



}
const Gallery_show = (props)=>{
    const { isDark_mode, setIsDark_mode}  = useContext(AppContext);
    const [show,setShow] =useState([]);
    useEffect(()=>{
    },[])
    useEffect(()=>{
        setShow(props.show);
        //console.log(props.show);
    },[props.show])
    //console.log(show);
    const open_more_modal = (show,key)=>{
        props.onGallery(true,show,key);
    };
        if(Array.isArray(show)){
            if(typeof(show[0])==='object')
            {
                return(
                <div className="sm:grid sm:grid-cols-12 sm:gap-4">
                    {show.map((item,key)=>(
                    <div key={key} className="sm:col-span-3 ">
                            <div className="ui_card mb-[32px] flex flex-col  border-[1px]">
                                <div className="flex flex-row justify-center items-center sm:hidden">
                                    <div className="card-image border-[1px] mb-[8px] rounded-[11px]">
                                        {item.show&&
                                        (<img className="rounded-[11px]"src={item.show.images[1].url}></img>)
                                        }
                                    </div>
                                </div>
                                <div className="hidden sm:block card-image border-[1px] mb-[8px] rounded-[11px]">
                                        {item.show&&
                                        (<img className="rounded-[11px]"src={item.show.images[1].url}></img>)
                                        }
                                </div>
                                {item.show&&(
                                    <div className="card-body flex flex-col">
                                        <div className="h-[50px] ">
                                            {
                                                isDark_mode? 
                                                (<div className="text-[16px] max-h-[50px] text-left text-black overflow-hidden ">{item.show.name}</div>):
                                                (<div className="text-[16px] max-h-[50px] text-left  text-black overflow-hidden ">{item.show.name}</div>)
                                            }

                                        </div>
                                        <div className="text-[14px] text-[#718096] h-[20px] overflow-hidden mb-[10px]">{item.show.publisher}</div>
                                        <button onClick={(e)=>{open_more_modal(item,key)} } className=" rounded-[4px] flex justify-start items-center gap-1  font-bold">
                                            <div className="flex justify-center  rounded-md border border-transparent px-2 py-1 bg-brand text-base  font-medium text-white shadow-sm hover:bg-caution focus:outline-none focus:border-caution focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 flex items-center">更多</div>
                                        </button>   
                                    </div>
                                )}
                            </div>
                    </div>
                    ))}
                </div>
                )
            }
            else{
                return(
                        <div className="flex flex-col items-center justify-center ">
                            <img className="w-[60px] h-[60px]" src={emptyfolder}></img>
                            <div className="text-[#71809] font-[500] text-[20px] font-sans">你並未收藏任何Podcast</div>
                            {/* <div className="text-[#71809] font-[500] text-[18px]">你並未收藏任何Podcast</div> */}
                        </div> 
                    )
                }
        }
}
const YourPlayerList = (props) =>{
    const { isDark_mode, setIsDark_mode}  = useContext(AppContext);
    const token = localStorage.getItem('accessToken');
    const href = 'https://api.spotify.com/v1/shows/7HXIJ7YaaWye5fph1qtEu4';
    const [ep, setEp] = useState({});
    const [ show,setShow] = useState([""]);
    const [ loveEp, setLoveEp] = useState([]);
    const [index,setIndex] = useState(0);
    const options = ["帳戶", "登出"]; // 下拉選單的選項列表
    const [selectedOption, setSelectedOption] = useState(''); // 當前選中的選項
  
    const handleSelect = (option) => {
      setSelectedOption(option);
    };
    useEffect(()=>{
    let result = setEpData(token,href);
    let save_love = getlove_ep_list(token);
    },[])
    useEffect(()=>{
        console.log(props);
        setIndex(props.selected_index);
        if(props.cg_open){
            const keys =Object.keys(props.cg_open);
            //console.log(Object.keys(props.cg_open));
            setShow(props.cg_open[keys[0]]);
        }
    },[props.cg_open])
    function getGallery(open,show,key){
        props.on_you_player(open,show,key);
    }
    async function setEpData(token,href){
        let result = await getEp(token,href);
        setEp(result);
        return result;
    }
    async function getlove_ep_list(token){
        let save_ep = await getUserSaveEp(token);
        console.log(save_ep.items);
        setLoveEp(save_ep);
        return save_ep;
    }
    return (
        <div  className="pt-[20px] pb-[20px] sm:pt-[40px] pl-[24px] pr-[24px] ">
            
            <div className="hidden  container sm:flex sm:flex-row justify-between items-center sm:mb-2">
                {/* left side */}
                <div className="hidden sm:block">
                    <Greeting ></Greeting>
                </div>
{/* <!-- Dropdown menu --> */}
                {/* right side */}
                <div className="flex flex-row justify-between items-center">
                    <div className="mr-[10px]">
                    {
                            isDark_mode ? 
                            (<i onClick={(e)=>{setIsDark_mode(false)}} className="far fa-sun text-[30px]"></i>):
                            (<i onClick={(e)=>{setIsDark_mode(true)}} className="far fa-moon text-[30px]"></i>)
                        }
                    </div>

                    <div id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="sm:flex flex-row flex-start justify-items-start items-center bg-[#718096] w-[150px] rounded-[30px] py-[0px]" type="button">

                        { props.data.images ?
                        (<div className=""><img className="w-[48px] h-[48px] rounded-[24px] mr-[5px]" src={props.data.images[0].url} alt="User Icon"></img></div>):
                        (<div></div>)
                        }
                        <div className="text-[12px] font-700  text-[#111] leading mr-[5px]">個人檔案</div>
                        {/* <li className="dropdown" src=""></li> */}

                        <svg className="w-2.5 h-2.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </div>  
                </div>


                {/* dropItem */}
                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">帳戶</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">登出</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-12 gap-4">
                <div className="col-1 sm:col-span-9 ">
                    {
                        props.selected_index !== props.cg_length ? 
                        ( <Gallery_show show={show} index={props.selected_index} onGallery={getGallery}></Gallery_show>)
                        :
                        (<MyLoveEp ></MyLoveEp>)
                    }
                    {/* <div className="card">
                        <div className="card-image">1</div>
                        <div className="card-body">2</div>
                        <div className="card-footer">3</div>
                    </div>   */}
                </div>
                <div className="sm:col-span-3">
                    <Player ></Player>
                </div>

            </div>

        </div>
    )
}
export default YourPlayerList;