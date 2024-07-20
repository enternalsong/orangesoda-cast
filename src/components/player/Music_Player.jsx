import axios from 'axios';
import { useState,useContext,useEffect } from 'react';
import { AppContext } from '../../store/AppProvider';
import millisecondsToTime from '../../api/compute';
import close from '../../assets/images/close.svg';
import {getUserSaveEp} from '../../api/api';
import player_play from '../../assets/images/player_play.svg';
import player_stop from '../../assets/images/player_stop.svg';
export const Music_Player = ()=>{
    const token = localStorage.getItem('accessToken');
    const { playerEpItem, setPlayerEpItem }  = useContext(AppContext);
    const { player_state, setPlayer_state }  = useContext(AppContext);
    const { isClose, setIsClose} = useContext(AppContext);
    const {isDark_mode}  = useContext(AppContext);
    const [ save_ep_list, setSave_ep_list] = useState(null);
    const [save_id_list,setSave_id_list] = useState([]);
    useEffect(()=>{
        let saveEp = getSaveEp_list(token);
        console.log("init");
        setIsClose(false);
    },[])
    useEffect(()=>{
        console.log(save_ep_list);
        if(Array.isArray(save_ep_list))
        {
            console.log("save id start");
            saveEp_id_list();
        }
    },[save_ep_list])
    async function getSaveEp_list(token){
        let result = await getUserSaveEp(token);
        console.log(result);
        setSave_ep_list(result.items);
    }
    const saveEp_id_list=()=>{
        let epList = [];
        
        console.log(save_ep_list);

            for(let i=0 ; i< save_ep_list.length;i++){
                {epList.push(save_ep_list[i].episode.id);}
            }
        setSave_id_list(epList);
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
    const player_playing = (play_ep) =>{
        setPlayerEpItem(play_ep);
        setPlayer_state('playing');
    }
    const player_stoping = (play_ep)=>{
        setPlayer_state('stop');
    }
    return(
        <>
        {
            !isClose?
            (<div>
                        {isDark_mode ?
            (        <div className="bg-[#4d5156] mt-5 sm:mt-[10px]  relative z-10 rounded-xl shadow-xl">
                        <div
                            className="bg-[#4d5156] border-slate-100 transition-all duration-500 dark:bg-slate-800  dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8 mt-[0px]">
                            <img src={playerEpItem?.images[1].url} loading="lazy" decoding="async" alt="" className="hidden sm:block w-[100px] h-[100px] sm:w-[100%] sm:h-[100%] mt-[0px]" />
                            <div className="flex items-center space-r-4">
                            <img src={playerEpItem?.images[1].url} loading="lazy" decoding="async" alt="" className="flex-none rounded-lg bg-slate-100  mr-[10px] sm:hidden" width="100" height="100"/>
                                <div className="min-w-0 flex-auto space-y-1 font-semibold">
            
                                    <p className="text-dark transition-all duration-500 show-name text-[1p6x] mb-[4px]  leading-6">
            
                                        <div title="Episode" className="text-white">{playerEpItem?.name}</div>
                                    </p>
                                    <h2 className="truncate text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 sm:text-hidden-inner">
                                        {playerEpItem?.description}
                                    </h2>
                                    {/* <p className="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
                                        Full Stack Radio
                                    </p> */}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <div className="bg-[#4d5156] transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 w-1/2 h-2" role="progressbar"
                                            aria-label="music progress" aria-valuenow="1456" aria-valuemin="0" aria-valuemax="4550"></div>
                                    </div>
                                    <div
                                        className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
                                        <div
                                            className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5">
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                                    <div className="text-cyan-500 transition-all duration-500 dark:text-slate-100">24:50</div>
                                    <div className="text-slate-500 transition-all duration-500 dark:text-slate-400">{millisecondsToTime(playerEpItem.duration_ms)}</div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-slate-50 text-slate-500 transition-all duration-500 dark:bg-slate-600 transition-all duration-500 dark:text-slate-200 rounded-b-xl flex items-center">
                            <div className="flex-auto flex items-center justify-evenly">
                                <button onClick={(e)=>{handle_bookmark_click_delete(token,playerEpItem.id)}} type="button" aria-label="Add to favorites">
                                <i   className="fas fa-bookmark  text-[#fe7f50] text-[20px]"></i>  
                                </button>
            
                                <button type="button" aria-label="Rewind 10 seconds">
                        <svg width="24" height="24" fill="none">
                            <path d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M5 5v3.111c0 .491.398.889.889.889H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        </button>
                            </div>
                            <button type="button" className="bg-white text-slate-900 transition-all duration-500 dark:bg-slate-100   dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center" aria-label="Pause">
                        <svg width="30" height="32" fill="currentColor">
                        <rect x="6" y="4" width="4" height="24" rx="2"></rect>
                        <rect x="20" y="4" width="4" height="24" rx="2"></rect>
                        </svg>
                    </button>
                            <div className="flex-auto flex items-center justify-evenly">
                                <button type="button" aria-label="Skip 10 seconds" className="">
                        <svg width="24" height="24" fill="none">
                            <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        </button>
                                <button type="button" className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 transition-all duration-500 dark:text-slate-100 transition-all duration-500 dark:ring-0 transition-all duration-500 dark:bg-slate-500">
                        1x
                        </button>
                            </div>
                        </div>
                    </div>):
                    (        <div className="mt-5  sm:mt-[10px] relative z-10 rounded-xl shadow-xl">
                    
                    <div className="bg-white border-slate-100 transition-all duration-500 dark:bg-slate-800  dark:border-slate-500 border-b rounded-t-xl p-4 pb-6  space-y-6 sm:space-y-8 sm:space-y-6 sm:space-y-8">
                        <button onClick={(e)=>{setIsClose(true)}}className="absolute top-[20px] right-[20px] sm:hidden">
                            <img className="w-[25px] h-[25px]" src={close}></img>
                        </button>
                        <img src={playerEpItem?.images[1].url} loading="lazy" decoding="async" alt="" className="hidden sm:block w-[100px] h-[100px] sm:w-[100%] sm:h-[100%] mt-[0px]" />
                        <div className="flex items-center space-r-4">
                        <img src={playerEpItem?.images[1].url} loading="lazy" decoding="async" alt="" className="flex-none rounded-lg bg-slate-100  mr-[10px] sm:hidden" width="100" height="100"/>
                            <div className="min-w-0 flex-auto space-y-1 font-semibold">

                                <p className="text-dark transition-all duration-500 show-name text-[1p6x] mb-[4px]  leading-6">

                                    <div title="Episode">{playerEpItem?.name}</div>
                                </p>
                                <h2 className="truncate text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 sm:text-hidden-inner">
                                    {playerEpItem?.description}
                                </h2>
                                {/* <p className="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
                                    Full Stack Radio
                                </p> */}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <div className="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 w-0 h-2" role="progressbar"
                                        aria-label="music progress" aria-valuenow="1456" aria-valuemin="0" aria-valuemax="4550"></div>
                                </div>
                                <div
                                    className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute left-0 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
                                    <div
                                        className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5">
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                                <div className="text-cyan-500 transition-all duration-500 dark:text-slate-100">0:00</div>
                                <div className="text-slate-500 transition-all duration-500 dark:text-slate-400">{millisecondsToTime(playerEpItem.duration_ms)}</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="bg-slate-50 text-slate-500 transition-all duration-500 dark:bg-slate-600 transition-all duration-500 dark:text-slate-200 rounded-b-xl flex items-center">
                        <div className="flex-auto flex items-center justify-evenly">
                            {
                            save_id_list.includes(playerEpItem.id)? 
                                (
                                    <button onClick={(e)=>{handle_bookmark_click_delete(token,playerEpItem.id)}} type="button" aria-label="Add to favorites">
                                        <i className="fas fa-bookmark  text-[#fe7f50] text-[20px]"></i>
                                    </button>  )
                                :
                                (<button onClick={(e)=>{handle_bookmark_click(token,playerEpItem.id)}} type="button" aria-label="Add to favorites">
                                <i className="far fa-bookmark  text-[#fe7f50] text-[20px]"></i>
                                </button>  )
                            }

                            <button type="button" aria-label="Rewind 10 seconds">
                    <svg width="24" height="24" fill="none">
                        <path d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 5v3.111c0 .491.398.889.889.889H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    </button>
                        </div>
                        {
                            player_state==="playing"?
                            (                            
                                <butto onClick={()=>{player_stoping()}}>
                                <img   className="w-20 h-20 sm:w-[20px] sm:h-[20px] lg:w-20 lg:h-20" src={player_stop}></img>
                                </butto>
                            ):
                            (   <button onClick={()=>{player_playing(playerEpItem)}}>
                                <img  className="w-20 h-20 sm:w-[20px] sm:h-[20px] lg:w-20 lg:h-20" src={player_play}></img>
                                </button>
                            )
                        }
                        <div className="flex-auto flex items-center justify-evenly">
                            <button type="button" aria-label="Skip 10 seconds" className="">
                    <svg width="24" height="24" fill="none">
                        <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    </button>
                            <button type="button" className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 transition-all duration-500 dark:text-slate-100 transition-all duration-500 dark:ring-0 transition-all duration-500 dark:bg-slate-500">
                    1x
                    </button>
                        </div>
                    </div>
                </div>)
        }
            </div>):
            (<div></div>)
        }
        </>
       
    )
};

