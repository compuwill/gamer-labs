const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
var request = require('request');


router.get('/api/steaminfo/:id', (req, res) => {

    var url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=E644017179683226F8E7FF11647AA4A8&steamids=${req.params.id}`

    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        if(!error)
        {
            res.setHeader('Content-Type', 'application/json');
            res.send(steamHttpBody);
        }
        else
        {
            
                res.status(200).json(error);
        }


    });

    // const response = fetch(url, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   if (response.ok) {
    //       response.json().then((data) => {
    //         console.log(data);
    //         res.status(400).json(data); 
    //       })
          
    //   } else {
    //     console.log(response);
    //     response.json().then((data) => {
    //       alert(data.message);
    //     });
    
    //   }
    //res.status(200).json({message: 'failed'});
});


module.exports = router;