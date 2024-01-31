import { useState,useEffect } from 'react';
import close_svg from './../../assets/images/close.svg'
import { rename_firebase_cg } from '../../api/firebase';
const Modal_rename = (props)=>{
    const [ModalOpen, setModalOpen] = useState(false);
    const [cg_name,setCg_name] = useState("")

    const Modal_Close = ()=>{
        setModalOpen(false);
        props.onClose("rename",false);
    }
    //handle change of input
    useEffect(()=>{
      setCg_name(Object.keys(props.selected_cg[1]));
    },[])
    const handleInputChange = (e)=>{
      setCg_name(e.target.value);
    }
    //handle change of the name let  rename category
    const fn_rename_cg =()=>{
      rename_firebase_cg(props.userId,cg_name,props.selected_cg);
      props.oncgUpdate("rename",false);
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
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 sm:mt-0  sm:text-left">
                        <div className="w-full flex justify-between p-[5px] border-b-[2px]">
                            <h3
                                className="text-lg leading-6 font-medium text-gray-900" 
                                id="modal-headline"
                                style={{fontFamily:'Noto Sans TC'}}
                            >
                                編輯名稱
                            </h3>
                            <button onClick={Modal_Close}><img src={close_svg}></img></button>
                        </div>
                    </div>
                    <div className="mt-2">
                      <input type="text" onChange={(e)=>{handleInputChange(e)} } value={cg_name} className="w-full p-2 text-sm leading-5 text-gray-500 bg-[#F7F7F7]"/>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span className="mt-3 flex rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      onClick={Modal_Close}
                      type="button"
                      className="flex w-[90px] justify-center rounded-md border-[1px] border-transparent  py-2  hover:border-black text-base sm:text-sm sm:leading-5 mr-2 text-center "
                    >
                      取消
                    </button>
                    <button
                      onClick={fn_rename_cg }
                      type="button"
                      className="flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-brand text-base leading-6 font-medium text-white shadow-sm hover:bg-caution focus:outline-none focus:border-caution focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 flex items-center"
                    >
                      確認更改名字
                    </button>
                  </span>
                </div>
              </div>
            </div>
      </div>
    )
}
export default Modal_rename;