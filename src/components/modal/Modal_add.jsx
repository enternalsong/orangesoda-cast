import { useState,useEffect } from 'react';
import { search,saveUserShow} from '../../api/api';
import close_svg from './../../assets/images/close.svg';
import { save_firebase_pt} from '../../api/firebase';
const Modal_add = (props)=>{
    const token = localStorage.getItem("accessToken");
    const [ModalOpen, setModalOpen] = useState(false);
    const [searchText, setSearchText] =useState("");
    const [searchPtList,setSearchPtList] = useState([]);
    const [s_pt,setS_pt] = useState([]);
    const [isClick_index,setIsClick_index] = useState();
    useEffect(()=>{
    },[searchPtList])
    async function SearchPodcast(token,text){
        //let result = getUserPlayerList(token);
        let result1 = await search(token,text);
        let pt_list = result1.shows.items;
        setSearchPtList(pt_list);
        console.log(pt_list);
    }
    const Modal_Close = ()=>{
        setModalOpen(false);
        props.onClose("add_podcast",false);
    }
    const handleInputChange = (e)=>{
        setSearchText(e.target.value);
    }
    const handleClick_pt = (pt,index)=>{   
      setIsClick_index(index);
      console.log(pt);
      console.log(props.selected_cg);
      //initialize save data
      setS_pt({
                "show":pt
              });
    }
    const array_zero_check = (s_arr)=>{
      let newArray = [];
      //console.log(s_arr[0]);
      //check duplicate
      if(s_arr[0] === '')
      {//console.log("first add")
        newArray = [s_pt];

      }
      else{
        newArray = [ ...s_arr,s_pt ];

      }
      return(newArray);
    }
    const fn_save_Click = ()=>{
      const s_arr = props.selected_cg[1][Object.keys(props.selected_cg[1])];
      const add_array = array_zero_check(s_arr);
      const spotify_show_id = s_pt.show.id;
      save_firebase_pt(props.userId,props.selected_cg,add_array);
      //here is save process for spotify data
      if(props.selected_cg[0] === 0){
        console.log("save user show");
          saveUserShow(token,spotify_show_id)
      }
      //update alfa data
      props.oncgUpdate("add_podcast",false);
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
                                新增Podcast
                            </h3>
                            <button onClick={Modal_Close}><img src={close_svg}></img></button>
                        </div>
                      <div className="mt-2">
                        <div className="flex bg-[#F7F7F7] p-[8px] items-center">
                            <button className="mr-2" onClick={(e)=>{SearchPodcast(token,searchText)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18" fill="none">
                                <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#ACADB9"/>
                                </svg>
                            </button>
                            <input type="text" onChange={(e)=>{handleInputChange(e)} } value={searchText} className="w-full p-2 text-sm leading-5 text-gray-500 bg-[#F7F7F7]" placeholder="開始搜尋"/>
                        </div>                            
                            {searchPtList.length>0 &&(
                                <div>
                                    <div>搜尋結果</div>
                                    <div className="grid grid-cols-4 gap-4">
                                        {searchPtList.map((pt,key)=>{
                                        return(
                                            <div onClick={(e)=>{handleClick_pt(pt,key)}} className={`p-2 border-white hover:border-caution border-[1px] rounded-[8px] shadow ${isClick_index===key ? "border-[2px] border-caution":""}`} key={key}>
                                                <div className="flex flex-col justify-center">
                                                    <img className="card-image" src={pt.images[1].url}></img>
                                                    <div className="card-body">
                                                        <div className="max-h-[50px] overflow-hidden mb-2">{pt.name}</div>
                                                        <div className="text-[#93989A]">{pt.publisher}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        })
                                    }
                                    </div>
                                </div>)
                            }
                            
                      </div>
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
                      onClick={fn_save_Click}
                      type="button"
                      className="flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-brand text-base leading-6 font-medium text-white shadow-sm hover:bg-caution focus:outline-none focus:border-caution focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 flex items-center"
                    >
                      確認新增
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
    )
}
export default Modal_add;