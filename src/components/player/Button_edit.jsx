
import 'useState' from 'react';

const Button_edit = () =>{
    const [selectedOption, setSelectedOption ] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
    setIsOpen(!isOpen);
    };
    const options = ['編輯名稱','刪除分類','新稱Podcast'];
    return(
        <div className={`absolute left-[10px] top-[10px] w-[120px] bg-white text-black  ${isOpen ? 'block' : 'hidden'}`}>
        {/* Side Bar */}
        <div className="flex  flex-col flex-start border-[1px]">
            {   
                options.map((option,key)=>(
                    <div key={key} className="text-[14px] font-500  border-b-[1px] p-[16px]">
                        {option}
                    </div>
                ))
            }
        </div>
    </div>
    )
}

export default Button_edit;
