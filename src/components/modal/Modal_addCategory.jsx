import { useState,useEffect } from 'react';
import close_svg from './../../assets/images/close.svg';
import {getDatabase,ref,set,onValue , update} from 'firebase/database';
import database from '../../api/firebase';

const Modal_addCatergory = (props)=>{
    const token = localStorage.getItem("accessToken");
    const [categoryName, setCategoryName] =useState("");
    const [cg,setCg] = useState([]);
    const Modal_Close = ()=>{
        props.onClose("add_category",false);
    }
    const handleInputChange = (e)=>{
        setCategoryName(e.target.value);
    }
    useEffect(()=>{
      setCg(props.cg);
    },[])
    useEffect(()=>{
      console.log(cg);
    },[cg])
    //create firebase new category item
    const update_firebase_cg=(cg,userId)=>{  
      update(ref(database, 'Spotify/user/'+ userId), {
        category:cg
      }).then(()=>{
        console.log("rename successful");
          //Data saved successfully
      }).catch((error)=>{
          console.log(`error:${error}`);     
      })
  }
  //create new category item 
  function update_cg(name){
    console.log(name);
    const newCg = {[name]:[""]};
    console.log([...cg]);
    let newobj = [];
    newobj= [ ...cg , newCg];
    update_firebase_cg(newobj,props.userId);
    props.oncgUpdate("add_category",false);
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
                                新增分類
                            </h3>
                            <button onClick={Modal_Close}><img src={close_svg}></img></button>
                        </div>
                      <div className="mt-2">
                        <div className="flex bg-[#F7F7F7] p-[8px] items-center">
                            <input type="text" onChange={(e)=>{handleInputChange(e)} } value={categoryName} className="w-full p-2 text-sm leading-5 text-gray-500 bg-[#F7F7F7]" placeholder="清輸入分類名稱"/>
                        </div>                              
                      </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
                    <button
                      onClick={Modal_Close}
                      type="button"
                      className="flex w-[90px] justify-center rounded-md border-[1px] border-transparent  py-2  hover:border-black text-base sm:text-sm sm:leading-5 mr-2 text-center "
                    >
                      取消
                    </button>
                    <button
                      onClick={(e)=>{update_cg(categoryName)}}
                      type="button"
                      className="flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-brand text-base leading-6 font-medium text-white shadow-sm hover:bg-caution focus:outline-none focus:border-caution focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 flex items-center"
                    >
                      確認新增分類
                    </button>
                </div>
              </div>
            </div>
          </div>
    )
}

export default Modal_addCatergory;