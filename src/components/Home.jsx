import { useState , useEffect , useRef,useContext} from 'react';

import { useNavigate } from 'react-router-dom';
import spotifyIcon from './../assets/images/spotify-icon.png';
import mySvg from './../assets/images/logo.svg';
import add_icon from './../assets/images/add.svg';
import YourPlayerList from './player/YourPlayerList';
import { fetchProfile } from '../api/api.js';
import Modal_rename from './modal/Modal_rename.jsx';
import Modal_delete from './modal/Modal_delete.jsx';
import Modal_add from './modal/Modal_add.jsx'
import Modal_addCatergory from './modal/Modal_addCategory.jsx';
import Modal_show_inner from './modal/Modal_show_inner.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import { getDatabase,ref,set,onValue} from 'firebase/database';
import database,{get_firebase_cg,delete_firebase_cg} from '../api/firebase';
import axios from 'axios';
import { AppContext } from '../store/AppProvider.jsx';

const Home = () =>{
    const token = localStorage.getItem("accessToken");
    const {isDark_mode,setIsDark_mode }  = useContext(AppContext);
    const {username,setUsername }  = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [ImageUrl ,setImageUrl ] = useState('');
    const [Userdata,setUserdata] = useState({});
    const [ModalRenameOpen, setModalRenameOpen] = useState(false);
    const [ModalDeleteOpen, setModalDeleteOpen] = useState(false); 
    const [ ModalAddOpen, setModalAddOpen]  = useState(false);
    const [ ModalAddcatergory, setModalAddcatergory] = useState(false);
    const [ ModalMoreOpen,setModalMoreOpen] = useState(false);
    const [cg_list,setCg_list] = useState([]); //user_category
    const [cg_select,setCg_select] = useState([]); // Array[index,show[] ]
    const [cgmark_open_index,setCgmark_open_index] = useState(0); //selected_index cg for yourplay.jsx
    const [cg_open,setCgopen] = useState({}); //selected_cg for yourplay.jsx
    const [show_select,setShow_select] = useState({});
    const [ show_list_key,setshow_list_key] = useState({});
    useEffect(()=>{
        getProfile();
    },[]);
    useEffect(()=>{
        //console.log(cg_list);
        //cg_list initilaize and set cg_open
        setCgopen(cg_list[cgmark_open_index]);
    },[cg_list]);
    function get_firebase_cg(userId){
        const dbRef = ref(database,`Spotify/user/${userId}`);
        onValue(dbRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            if(childKey==="category"){
              //console.log(childData);
              setCg_list(childData);
            }
          })
          // console.log(snapshot.val()); //show all val(
        }, {
          onlyOnce: true
        });
      }
    async function getProfile(){
        let result = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res =>{
            //setImageUrl(res.data.images[0].url);
            setUserdata(res.data);                    //get spotify profile
            setUsername(res.data.display_name);
            get_firebase_cg(res.data.id)//get firebase category
        }).catch(err=>{
            console.log(err);
        })
        //console.log(result);
        return(result);
    }

    const Modal_Open = (mode) =>{
        if(mode ==="rename"){ setModalRenameOpen(true)}
        else if(mode ==="delete"){ setModalDeleteOpen(true)}
        else if(mode ==="add_podcast"){setModalAddOpen(true)}
        else if (mode ==="add_category"){setModalAddcatergory(true)}
    }
    const getUpdate_cg_list = (mode,close)=>{
        get_firebase_cg(Userdata.id);
        getCloseFromModal(mode,close);
    };
    const getCloseFromModal = (mode,close)=>{
        if(mode ==="rename"){ setModalRenameOpen(close)}
        if(mode ==="delete"){ setModalDeleteOpen(close)}
        if(mode ==="add_podcast"){setModalAddOpen(close)}
        if(mode ==="add_category"){setModalAddcatergory(close)}
        if(mode ==="show_more"){setModalMoreOpen(close)}
    }
    const getOpenModalFromChild=(type,s_array_cg)=>{
        setCg_select(s_array_cg);
        Modal_Open(type);
    }
    const cgamrk_click=(key)=>{
        //console.log(key);
        setCgopen(cg_list[key]);
        if(key!==cgmark_open_index)
        {setCgmark_open_index(key);}
    }
    const open_more_modal =(open,show,key)=>{
        setModalMoreOpen(open);
        setShow_select(show);
        setshow_list_key(key);
    }
    return(

    <div>
        {isDark_mode ? 
        ( 
            <div className="bg-[#202124] h-[100vh] w-[100vw] fixed overflow-auto">
            {
            ModalRenameOpen && (<Modal_rename selected_cg={cg_select} userId={Userdata.id} oncgUpdate={getUpdate_cg_list} onClose={getCloseFromModal}></Modal_rename>)
            }
            {
            ModalDeleteOpen && (<Modal_delete cg_list={cg_list} selected_cg={cg_select} userId={Userdata.id} onClose={getCloseFromModal} oncgUpdate={getUpdate_cg_list}></Modal_delete>)
            }
            {
            ModalAddOpen && (<Modal_add selected_cg={cg_select} userId={Userdata.id}  oncgUpdate={getUpdate_cg_list} onClose={getCloseFromModal}></Modal_add>)
            }
            {
            ModalAddcatergory && (<Modal_addCatergory cg={cg_list} userId={Userdata.id} onClose={getCloseFromModal} oncgUpdate={getUpdate_cg_list}></Modal_addCatergory>)
            }
            {
            ModalMoreOpen && (<Modal_show_inner cg_open={cg_open} cg_index={cgmark_open_index} show={show_select} userId={Userdata.id} show_index={show_list_key} onClose={getCloseFromModal} oncgUpdate={getUpdate_cg_list} />)
            }
        <div className="sm:flex sm:items-start bg-[#202124] text-[white]">
            <div className=" sm:px-[32px] pt-[20px] pb-[20px] sm:pt-[40px] pl-[24px] pr-[24px] sm:w-1/5 sm:flex sm:flex-col items-center bg-[#202124] sm:h-screen  sm:py-[40px] sm:min-w-[210px] ">
                <div className="">
                    <div className="flex items-center justify-center border-b-2 mb-[10px] ">
                        <img className=" mb-4 h-[30px] top-3 "src={mySvg} alt="My svg Image"></img>
                    </div>
                    <div className="mt-[40px]">
                        <div className="container flex flex-col imtes-center">
                            {/* one button */}
                            {
                                cg_list.length > 0 && ( cg_list.map((item,key)=>{
                                    return(
                                        <div key={key}>
                                            <div onClick={(e)=>{cgamrk_click(key)}} className={`flex justify-between items-center rounded-[12px] text-[14px]  p-[16px] border-[2px] sm:mb-[12px] hover:border-brand ${ key===cgmark_open_index ? 'bg-brand':''} `}>
                                                <div className="flex items-center leading-[20px]">
                                                    {
                                                        key===0 ? 
                                                        (<img href={spotifyIcon}></img>):
                                                        (<i className="mr-3 text-[21px]">📚</i>)
                                                    }
                                                    <div className="text-[14px] ">{Object.keys(cg_list[key])}</div>
                                                </div>
                                                <Sidebar onModalOpen={getOpenModalFromChild} cg_select={cg_list[key]} index={key}></Sidebar>
                                             </div>
                                        </div>
                                    )
                                }))
                            }
                            {
                                <div>
                                    <div onClick={(e)=>{cgamrk_click(cg_list.length)}}  className={`flex justify-between items-center rounded-[12px] text-[14px]  p-[16px] border-[2px] mb-[12px] hover:border-brand ${ cg_list.length===cgmark_open_index ? 'bg-brand':''}`}>
                                        <div className="flex items-center leading-[20px]">
                                            <i className="mr-3 text-[21px]">❤️</i>
                                            <div className="text-[14px] ">已收藏Podcast單集</div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div onClick={(e)=>{Modal_Open("add_category")} } className="flex justify-between items-center border-[2px] border-black rounded-[12px] text-[14px]  p-[16px] w-full">
                                    <div className="flex items-center leading-[20px]" >
                                        <button ><img className="mr-3" src={add_icon} alt="add_icon"></img></button>
                                        <div className="text-[14px]">新增分類</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:w-4/5 bg-[#202124] h-screen">
                <YourPlayerList data={Userdata} cg_open={cg_open} cg_length={cg_list.length} selected_index={cgmark_open_index}  on_you_player={open_more_modal}></YourPlayerList>
            </div>
        </div>
        </div>):
        (<div>    
            {
            ModalRenameOpen && (<Modal_rename selected_cg={cg_select} userId={Userdata.id} oncgUpdate={getUpdate_cg_list} onClose={getCloseFromModal}></Modal_rename>)
        }
        {
            ModalDeleteOpen && (<Modal_delete cg_list={cg_list} selected_cg={cg_select} userId={Userdata.id} onClose={getCloseFromModal} oncgUpdate={getUpdate_cg_list}></Modal_delete>)
        }
        {
            ModalAddOpen && (<Modal_add selected_cg={cg_select} userId={Userdata.id}  oncgUpdate={getUpdate_cg_list} onClose={getCloseFromModal}></Modal_add>)
        }
        {
            ModalAddcatergory && (<Modal_addCatergory cg={cg_list} userId={Userdata.id} onClose={getCloseFromModal} oncgUpdate={getUpdate_cg_list}></Modal_addCatergory>)
        }
        {
            ModalMoreOpen && (<Modal_show_inner cg_open={cg_open} cg_index={cgmark_open_index} show={show_select} userId={Userdata.id} show_index={show_list_key} onClose={getCloseFromModal} oncgUpdate={getUpdate_cg_list} />)
        }
        <div className="sm:flex sm:items-start ">
            <div className=" sm:px-[32px] pt-[20px] pb-[20px] sm:pt-[40px] pl-[24px] pr-[24px] sm:w-1/5 sm:flex sm:flex-col items-center bg-[#F6F7F8] sm:h-screen  sm:py-[40px] sm:min-w-[210px] ">
                <div className="container">
                    <div className="flex items-center justify-center border-b-2 mb-[10px] ">
                        <img className=" mb-4 h-[30px] top-3 "src={mySvg} alt="My svg Image"></img>
                    </div>
                    <div className="mt-[40px]">
                        <div className="container flex flex-col imtes-center">
                            {/* one button */}
                            {
                                cg_list.length > 0 && ( cg_list.map((item,key)=>{
                                    return(
                                        <div key={key}>
                                            <div onClick={(e)=>{cgamrk_click(key)}} className={`flex justify-between items-center rounded-[12px] text-[14px]  p-[16px] border-[2px] sm:mb-[12px] hover:border-brand ${ key===cgmark_open_index ? 'bg-brand':''} `}>
                                                <div className="flex items-center leading-[20px]">
                                                    {
                                                        key===0 ? 
                                                        (<img href={spotifyIcon}></img>):
                                                        (<i className="mr-3 text-[21px]">📚</i>)
                                                    }
                                                    <div className="text-[14px] ">{Object.keys(cg_list[key])}</div>
                                                </div>
                                                <Sidebar onModalOpen={getOpenModalFromChild} cg_select={cg_list[key]} index={key}></Sidebar>
                                             </div>
                                        </div>
                                    )
                                }))
                            }
                            {
                                <div>
                                    <div onClick={(e)=>{cgamrk_click(cg_list.length)}}  className={`flex justify-between items-center rounded-[12px] text-[14px]  p-[16px] border-[2px] mb-[12px] hover:border-brand ${ cg_list.length===cgmark_open_index ? 'bg-brand':''}`}>
                                        <div className="flex items-center leading-[20px]">
                                            <i className="mr-3 text-[21px]">❤️</i>
                                            <div className="text-[14px] ">已收藏Podcast單集</div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div onClick={(e)=>{Modal_Open("add_category")} } className="flex justify-between items-center border-[2px] border-black rounded-[12px] text-[14px]  p-[16px] w-full">
                                    <div className="flex items-center leading-[20px]" >
                                        <button ><img className="mr-3" src={add_icon} alt="add_icon"></img></button>
                                        <div className="text-[14px]">新增分類</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:w-4/5 bg-[#F6F7F8] h-screen">
                <YourPlayerList data={Userdata} cg_open={cg_open} cg_length={cg_list.length} selected_index={cgmark_open_index}  on_you_player={open_more_modal}></YourPlayerList>
            </div>
        </div>
    </div>)}
</div>
    )
}
export default Home;