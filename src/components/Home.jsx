import { useState , useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mySvg from './../assets/images/logo.svg';
import more_icon from './../assets/images/more_vert.svg';
import add_icon from './../assets/images/add.svg';
import YourPlayerList from './player/YourPlayerList';
import { fetchProfile,getUserPlayerList } from '../api/api.js';
import Modal_rename from './modal/Modal_rename.jsx';
import Modal_delete from './modal/Modal_delete.jsx';
import Modal_add from './modal/Modal_add.jsx'
import Modal_addCatergory from './modal/Modal_addCategory.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import axios from 'axios';
const Home = () =>{
    const token = localStorage.getItem("accessToken");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [ImageUrl ,setImageUrl ] = useState('');
    const [Userdata,setUserdata] = useState({});
    const [ModalRenameOpen, setModalRenameOpen] = useState(false);
    const [ModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [ ModalAddOpen, setModalAddOpen]  = useState(false);
    const [ ModalAddcatergory, setModalAddcatergory] = useState(false);
    const [ User_pt,setUser_pt ] = useState({});

    const sidebarRef = useRef(null);
    useEffect(()=>{
        getProfile();
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
              setIsOpen(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    },[]);
    useEffect(()=>{
        useGetPlayerList(token,Userdata.id);    
    },[Userdata]);

    async function getProfile(){
        let result = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res =>{
            console.log(res.data);
            //setImageUrl(res.data.images[0].url);
            setUserdata(res.data);
            return res.data;
        }).catch(err=>{
            console.log(err);
        })
        //console.log(result);

        return(result);
    }
    async function useGetPlayerList(token,user_id){
        let result = await getUserPlayerList(token,user_id);
        console.log(result);
        setUser_pt(result);
        console.log(User_pt);
        return result;
    }
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const Modal_Open = (mode) =>{
        if(mode ==="rename"){ setModalRenameOpen(true)}
        else if(mode ==="delete"){ setModalDeleteOpen(true)}
        else if(mode ==="add_podcast"){setModalAddOpen(true)}
        else if (mode ==="add_category"){setModalAddcatergory(true)}
    }

    const getCloseFromModal = (close,mode)=>{
        if(mode ==="rename"){ setModalRenameOpen(close)}
        if(mode ==="delete"){ setModalDeleteOpen(close)}
        if(mode ==="add_podcast"){setModalAddOpen(close)}
        if(mode ==="add_category"){setModalAddcatergory(close)}
    }
    const getOpenModalFromChild=(type)=>{
        Modal_Open(type);
    }
    return(
    <div>
        {
            ModalRenameOpen && (<Modal_rename onClose={getCloseFromModal}></Modal_rename>)
        }
        {
            ModalDeleteOpen && (<Modal_delete onClose={getCloseFromModal}></Modal_delete>)
        }
        {
            ModalAddOpen && (<Modal_add onClose={getCloseFromModal}></Modal_add>)
        }
        {
            ModalAddcatergory && (<Modal_addCatergory onClose={getCloseFromModal}></Modal_addCatergory>)
        }
        <div className="flex items-start">
            <div className="w-1/5 flex flex-col items-center bg-[#F6F7F8]  px-[32px] py-[40px] min-w-[210px] h-screen">
                <div className="container">
                    <div className="border-b-2">
                        <img className="mb-4 h-[30px] "src={mySvg} alt="My svg Image"></img>
                    </div>
                    <div className="mt-[40px]">
                        <div className="container flex flex-col imtes-center">
                            {/* one button */}
                            <div className="flex justify-between items-center rounded-[12px] text-[14px] bg-red-500  p-[16px] mb-[12px] ">
                                    
                                    <div className="flex items-center leading-[20px]">
                                        <i className="mr-3 text-[21px]">📚</i>
                                        <div className="text-[14px] ">學習清單</div>
                                    </div>
                                    <div>
                                        <button className="relative" onClick={toggleSidebar}><img className=" w-[20px] "src={more_icon} alt="more_icon"></img>
                                            <div ref={sidebarRef}>
                                                <Sidebar open={isOpen} onModalOpen={getOpenModalFromChild} ></Sidebar>
                                            </div>
                                        </button>
                                    </div>
                            </div>
                            <div className="flex justify-between items-center border-[2px] border-black rounded-[12px] text-[14px] bg-red-500 p-[16px] w-full">
                                    <div className="flex items-center leading-[20px]">
                                        <button onClick={(e)=>{Modal_Open("add_category")} }><img className="mr-3" src={add_icon} alt="add_icon"></img></button>
                                        <div className="text-[14px]">新增分類</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/5">
                <YourPlayerList data={Userdata}></YourPlayerList>
            </div>
        </div>
    </div>
    )
}
export default Home;