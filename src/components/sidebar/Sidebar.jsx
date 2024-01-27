
const Sidebar = (props)=>{

    const Modal_Open =(type)=>{
        console.log(`Modal ${type}`);
        props.onModalOpen(type);
    }
    return(
        <div className={`absolute left-[10px] top-[10px] w-[120px] bg-white text-black  ${props.open ? 'block' : 'hidden'}`}>
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
            <div className="flex  flex-col flex-start border-[1px]" onClick={()=>{Modal_Open("add_podcast")}}>          
                <div className="text-[14px] font-[500]  border-b-[1px] p-[16px] hover:text-[#FF7F50]">
                新增Podcast
                </div>         
            </div>
        </div>
    )
}
export default Sidebar;