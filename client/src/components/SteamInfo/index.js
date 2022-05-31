import React from 'react';
import { Link } from 'react-router-dom';

const SteamInfo = ({ steamID }) => {

    const pullInfo = async (event) => {
        try {


            const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=E644017179683226F8E7FF11647AA4A8&steamids=${steamID}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
    
              if (response.ok) {
                  response.json().then((data) => {
                    console.log(data);
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

    pullInfo();
    
  return (
    <div className="flex-row mb-3">
      <div className="card-body">
        {steamID &&
          (<div>{steamID} {}</div>)}
      </div>
    </div>
  );
};

export default SteamInfo;
