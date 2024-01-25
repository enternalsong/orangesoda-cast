import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mySvg from './../assets/images/logo.svg';
import more_icon from './../assets/images/more_vert.svg';
import add_icon from './../assets/images/add.svg';
import YourPlayerList from './player/YourPlayerList';
import { fetchProfile } from '../api/api.js';
import Modal_rename from './modal/Modal_rename.jsx';
import Modal_delete from './modal/Modal_delete.jsx';
import Modal_add from './modal/Modal_add.jsx'
import axios from 'axios';
const Home = () =>{
    const token = localStorage.getItem("accessToken");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [ImageUrl ,setImageUrl ] = useState('');
    const [Userdata,setUserdata] = useState({});
    const [ModalOpen, setModalOpen] = useState(false);
    const [ModalRenameOpen, setModalRenameOpen] = useState(false);
    const [ModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [ ModalAddOpen, setModalAddOpen]  = useState(false);
    useEffect(()=>{
        getProfile();    
    },[])
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
        console.log(result);
        return(result);
    }
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const Modal_Open = (mode) =>{
        if(mode ==="rename"){ setModalRenameOpen(true)}
        else if(mode ==="delete"){ setModalDeleteOpen(true)}
        else if(mode ==="add"){setModalAddOpen(true)}
    }

    const getCloseFromModal = (close,mode)=>{
        if(mode ==="rename"){ setModalRenameOpen(close)}
        if(mode ==="delete"){ setModalDeleteOpen(close)}
        if(mode ==="add"){setModalAddOpen(close)}
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
                                            <div className={`absolute left-[10px] top-[10px] w-[120px] bg-white text-black  ${isOpen ? 'block' : 'hidden'}`}>
                                                {/* Side Bar */}
                                                <div className="flex  flex-col flex-start border-[1px]" onClick={()=>{Modal_Open("rename")}}>          
                                                    <div className="text-[14px] font-[500]  border-b-[1px] p-[16px] hover:text-[#FF7F50]">
                                                    編輯名稱
                                                    </div>         
                                                </div>
                                                <div className="flex  flex-col flex-start border-[1px]" onClick={()=>{Modal_Open("delete")}}>          
                                                    <div className="text-[14px] font-[500]  border-b-[1px] p-[16px] hover:text-[#FF7F50]">
                                                    刪除分類
                                                    </div>         
                                                </div>
                                                <div className="flex  flex-col flex-start border-[1px]" onClick={()=>{Modal_Open("add")}}>          
                                                    <div className="text-[14px] font-[500]  border-b-[1px] p-[16px] hover:text-[#FF7F50]">
                                                    新增Podcast
                                                    </div>         
                                                </div>
                                            </div>
                                    
                                        </button>
                                    </div>
                            </div>
                            <div className="flex justify-between items-center border-[2px] border-black rounded-[12px] text-[14px] bg-red-500 p-[16px] w-full">
                                    
                                    <div className="flex items-center leading-[20px]">
                                        <img className="mr-3" src={add_icon} alt="add_icon"></img>
                                        <div className="text-[14px]">新增分類</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/5 pt-[40px] pl-[2.1%] pr-[5.2%]">
            <div  className="container">
                <YourPlayerList data={Userdata}></YourPlayerList>
            </div>
            </div>
        </div>
    </div>
    )
}
export default Home;