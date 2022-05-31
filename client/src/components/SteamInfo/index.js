import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SteamInfo = ({ steamID }) => {
    useEffect(()=>{
        pullInfo();

    }, [])


    const [steamInfo, setSteamInfo] = useState('');


    const pullInfo = async (event) => {
        try {


            const response = await fetch(`/api/steaminfo/${steamID}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
    
              if (response.ok) {
                  response.json().then((data) => {
                    
                    if(data && data.response && data.response.players.length == 1)
                    {
                        console.log(data.response.players[0]);
                        setSteamInfo(data.response.players[0])
                        var playerdata = data.response.players[0]
                    }                    
                  })
                  
              } else {
                console.log(response);
                response.json().then((data) => {
                  alert(data.message);
                });
            
              }


        } catch (e) {
            console.log("error")
        }
    }

    //pullInfo();
    
if(!steamInfo)
{
    return (<div className='mb-3'>Steam ID not found!</div>);
}
else
  return (
    <div className="bg-dark d-flex align-center justify-space-around mb-3">
        <img src={steamInfo.avatarmedium}/>
      <div className="card-body">
        <h4><a target="_blank" href={steamInfo.profileurl} >{steamInfo.personaname}</a></h4>
        <div className='detail'>
            {steamInfo.personastate === 0 && (<div className='flex-row align-center'><div className='status-indicator Offline mr-2'></div><div>Offline</div></div>)}
            {steamInfo.personastate === 1 && (<div className='flex-row align-center'><div className='status-indicator Online mr-2'></div><div>Online</div></div>)}
            {steamInfo.personastate === 2 && (<div className='flex-row align-center'><div className='status-indicator Busy mr-2'></div><div>Busy</div></div>)}
            {steamInfo.personastate === 3 && (<div className='flex-row align-center'><div className='status-indicator Away mr-2'></div><div>Away</div></div>)}
            {steamInfo.personastate === 4 && (<div className='flex-row align-center'><div className='status-indicator Snooze mr-2'></div><div>Snooze</div></div>)}

        </div>
        <div className='detail'>Real Name: {steamInfo.realname}</div>
        <div className='detail'>Location: {steamInfo.loccountrycode}, {steamInfo.locstatecode}        </div>
      </div>
    </div>
  );
};

export default SteamInfo;
