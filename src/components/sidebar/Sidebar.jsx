import more_icon from './../../assets/images/more_vert.svg';
import { useState , useEffect , useRef } from 'react';
const Sidebar = (props)=>{
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    useEffect(()=>{
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    },[])
    const Modal_Open =(type)=>{
        //console.log(`Modal ${type} [${props.index}]:${Object.keys(props.cg_select)}`);
        const selected = [props.index, props.cg_select]
        props.onModalOpen(type,selected);
    }
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
      function handleClickOutside(event) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    return(
        <div>
            <button className="relative" onClick={toggleSidebar}><img className=" w-[20px] "src={more_icon} alt="more_icon"></img>
            {/* Side Bar */}
            <div ref={sidebarRef}>
                <div className={`absolute left-[10px] top-[10px] w-[120px] bg-white text-black  ${isOpen ? 'block' : 'hidden'}`}>
                    {
                        props.index >0 ? (
                        <div>
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
                            <div className="flex  flex-col flex-start border-[1px]" onClick={()=>{Modal_Open("add_podcast")}}>          
                                <div className="text-[14px] font-[500]  border-b-[1px] p-[16px] hover:text-[#FF7F50]">
                                新增Podcast
                                </div>         
                             </div>
                        </div>
                    )
                    :(
                        <div className="flex  flex-col flex-start border-[1px]" onClick={()=>{Modal_Open("add_podcast")}}>          
                            <div className="text-[14px] font-[500]  border-b-[1px] p-[16px] hover:text-[#FF7F50]">
                            新增Podcast
                            </div>         
                        </div>
                    )}
                </div>
            </div>
            </button>
        </div>
    )
}
export default Sidebar;