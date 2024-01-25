import Player from './Player.jsx';
import { useEffect , useState} from 'react';
const Greeting = () => {
    
    const [greet,setGreet] = useState("");
    useEffect(()=>{
        const hour = new Date().getHours();
        console.log(hour);
        if(hour>=6 && hour <12){
            setGreet("早安")
        }else if( hour >=12 && hour < 17){setGreet("午安")}
        else if ( hour <=6 || (hour >17 && hour < 24) ){
            setGreet("晚安")
        }
    },[])  
    return(
        <div className="title">
            {greet}
        </div>
    )
}
const YourPlayerList = (props) =>{
    return (
        <div  className=" pl-[2.1%] pr-[5.2%]">
            <div className="container flex flex-row justify-between items-center">
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

            <div className="container">
                <div className="card-image"></div>
                <div className="card-body"></div>
                <div className="card-footer"></div>
            </div>
        </div>
    )
}
export default YourPlayerList;