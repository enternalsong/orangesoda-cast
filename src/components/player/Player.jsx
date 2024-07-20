import { AppContext } from '../../store/AppProvider';
import { useContext } from 'react';
import player_play from './../../assets/images/player_play.svg';
import player_stop from './../../assets/images/player_stop.svg';
import { Music_Player } from './Music_Player';
const Player = () =>{
    const { playerEpItem, setPlayerEpItem }  = useContext(AppContext);
    const { player_state, setPlayer_state }  = useContext(AppContext);

    return(
        <div className="absolute sm:relative w-[100%]  flex flex-col top-0 left-0 px-2">
        { playerEpItem=== null ? (<div></div>):
        <Music_Player></Music_Player>

        // (<div className=" h-[100%] player-bk" style={{fontFamily:'Noto Sans TC'}}>
        //     <div className="flex items-center justify-between pb-[16px] border-b-[1px] mb-[16px]">

        //         <div>
                        
        //         </div>
        //     </div>
        //     <div className="info">
        //     <div className="flex mb-[16px]">
        //     <img className=" w-[100px] h-[100px] sm:w-[100%] sm:h-[100%] " src={playerEpItem?.images[1].url} alt="Not found"></img>
        //         </div>
        //         <div className="show-name text-[14px] text-[#30A9DE] mb-[4px]">{playerEpItem?.name}</div>
        //         <div className="description player-des text-[12px] mb-[25px] text-hidden-inner">{playerEpItem?.description}</div>
        //         <div className="player-controller">
        //             <div className="flex items-center">
        //                 <button className="bg-[#FF7F50]">開始播放</button>
        //             </div>
        //         </div>
        //     </div>
        //     </div>)
                }
    </div>
    )

}
export default Player; 