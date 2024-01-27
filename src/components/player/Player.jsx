

const Player = (props) =>{
    
    return(
        <div className="player-bk" style={{fontFamily:'Noto Sans TC'}}>
            <div className="flex items-center justify-between pb-[16px] border-b-[1px] mb-[16px]">
                <div className="text-2xl">
                    正在播放    
                </div>
                <div>
                        safdfdas
                </div>
            </div>
            <div className="info">
                <div className="flex mb-[16px]">
                    { props.episode.images ?
                        ( <img className="w-[96px] h-[96px] mr-[16px]" src={props.episode.images[1].url} alt="Not found"></img>):
                        ( <img className="w-[96px] h-[96px] mr-[16px]" alt="Not found"></img>)
                    }
                    {
                        props.episode.episodes ?
                        (<div className="player-ep-name"> {props.episode.episodes.items[0].name}</div>):
                        (<div></div>)
                    }
                </div>
                <div className="show-name text-[14px] text-[#30A9DE] mb-[4px]">{props.episode.name}</div>
                <div className="player-date mb-[4px]">{props.episode.name}・{props.episode.name}</div>
                <div className="description player-des text-[12px] mb-[25px]">{props.episode.description}</div>
                <div className="player-controller">
                    <div className="flex items-center">
                        <button className="bg-[#FF7F50]">開始播放</button>
                    </div>
                </div>
            </div>





        </div>
    )

}
export default Player; 