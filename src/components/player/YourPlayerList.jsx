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
    const [show,setShow] =useState([""]);
    useEffect(()=>{
    },[])
    useEffect(()=>{
        setShow(props.show);
        console.log(props.show);
    },[props.show])
    if(Array.isArray(show)){
            if(typeof(show[0])==='object')
            {
                return(
                <div className="flex flex-col  justify-center p-[16px]">
                    {show.map((item,key)=>(
                    <div key={key}>

                        <div className="card grid grid-cols-12 gap-4 mb-[36px]">
                                <div className="card-image col-span-3">
                                    {item.show.images&&
                                    (<img className=""src={item.show.images[1].url}></img>)
                                    }
                                </div>
                                <div className="card-body flex flex-col col-span-9">
                                    <div className="title text-[16px]">{item.show.name}</div>
                                    <div className="contnet text-[14px] text-[#718096]">{item.show.description}</div>
                                </div>
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
    const [ cg,setCg] = useState({"save":""});
    const [ show,setShow] = useState([""]);
    const [index,setIndex] = useState(0);
    useEffect(()=>{
    let result = setEpData(token,href);
    console.log(props);
    console.log(props.data);
    },[])
    useEffect(()=>{
        setCg(props.cg_open);
    },[props.cg_open])
    useEffect(()=>{
        if(cg!=null)
        {
            const keys =Object.keys(cg);
            console.log(Object.keys(cg));
            setShow(cg[keys[0]]);
        }
    },[cg]);
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
                <div className="col-span-9 bg-gray-200">
                    <Gallery_show show={show}></Gallery_show>
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