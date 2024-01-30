import Player from './Player.jsx';
import { useEffect , useState} from 'react';
import { getEp } from '../../api/api.js';
import emptyfolder from './../../assets/images/emptyfolder.png'
const Greeting = () => {
    const [greet,setGreet] = useState("");
    useEffect(()=>{
        const hour = new Date().getHours();
        console.log(hour);
        if(hour>=6 && hour <12){
            setGreet("早安")
        }else if( hour >=12 && hour < 17){setGreet("午安")}
        else if ( hour <=6 || (hour >=17 && hour < 24) ){
            setGreet("晚安")
        }
    },[])  
    return(
        <div className="title">
            {greet}
        </div>
    )
}
const Gallery_show = (props)=>{
    const [show,setShow] =useState([]);
    useEffect(()=>{
    },[])
    useEffect(()=>{
        setShow(props.show);
        console.log(props.show);
    },[props.show])
    console.log(show);
    const btn_more=()=>{

    }
        if(Array.isArray(show)){
            if(typeof(show[0])==='object')
            {
                return(
                <div className="grid grid-cols-12 gap-4">
                    {show.map((item,key)=>(
                    <div key={key} className="col-span-3 ">
                            <div className="ui_card mb-[32px] flex flex-col  border-[1px]">
                                <div className="card-image border-[1px] mb-[8px] rounded-[11px]">
                                    {item.show&&
                                    (<img className="rounded-[11px]"src={item.show.images[1].url}></img>)
                                    }
                                </div>
                                {item.show&&(
                                    <div className="card-body flex flex-col">
                                        <div className="h-[50px] ">
                                            <div className="text-[16px] max-h-[50px] text-left overflow-hidden ">{item.show.name}</div>
                                        </div>
                                        <div className="text-[14px] text-[#718096] h-[20px] overflow-hidden mb-[10px]">{item.show.publisher}</div>
                                        <button className=" rounded-[4px] flex justify-start items-center gap-1  font-bold">
                                            <div className="flex justify-center  rounded-md border border-transparent px-2 py-1 bg-brand text-base  font-medium text-white shadow-sm hover:bg-caution focus:outline-none focus:border-caution focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 flex items-center">更多</div>
                                        </button>   
                                    </div>
                                )}
                            </div>
                    </div>
                    ))}
                </div>
                )
            }
            else{
                return(
                        <div className="flex flex-col items-center justify-center ">
                            <img className="w-[56px] h-[56px]" src={emptyfolder}></img>
                            <div className="text-[#71809] font-[500] text-[18px] font-sans">你並未收藏任何Podcast</div>
                            {/* <div className="text-[#71809] font-[500] text-[18px]">你並未收藏任何Podcast</div> */}
                        </div> 
                    )
                }
        }
}
const YourPlayerList = (props) =>{
    const token = localStorage.getItem('accessToken');
    const href = 'https://api.spotify.com/v1/shows/7HXIJ7YaaWye5fph1qtEu4';
    const [ep, setEp] = useState({});
    const [ show,setShow] = useState([""]);
    const [index,setIndex] = useState(0);
    useEffect(()=>{
    let result = setEpData(token,href);
    console.log(props);
    console.log(props.data);
    },[])
    useEffect(()=>{

        setIndex(props.selected_index);
        if(props.cg_open){
            const keys =Object.keys(props.cg_open);
            console.log(Object.keys(props.cg_open));
            setShow(props.cg_open[keys[0]]);
        }
    },[props.cg_open])

    async function setEpData(token,href){
        let result = await getEp(token,href);
        setEp(result);
        return result;
    }
    return (
        <div  className="pt-[40px] pl-[24px] pr-[24px]">
            <div className="container flex flex-row justify-between items-center mb-2">
                {/* left side */}
                <div>
                    <Greeting></Greeting>
                </div>
                {/* right side */}
                <div className="flex flex-row justify-between items-center">
                    { props.data.images ?
                    (<img className="w-[48px] h-[48px] rounded-[24px] mr-[12px]" src={props.data.images[0].url} alt="User Icon"></img>):
                    (<div></div>)
                    }
                    <div className="text-[16px] font-700  text-[#111] leading">{props.data.display_name}</div>
                    <li className="dropdown" src=""></li>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-9 ">
                    <Gallery_show show={show} index={props.selected_index}></Gallery_show>
                    {/* <div className="card">
                        <div className="card-image">1</div>
                        <div className="card-body">2</div>
                        <div className="card-footer">3</div>
                    </div>   */}
                </div>
                <div className="col-span-3">
                    <Player episode={ep}></Player>
                </div>

            </div>

        </div>
    )
}
export default YourPlayerList;