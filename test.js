const fs = require('fs');
const https = require('https')

const dotaHostname = "www.opendota.com";

const getMethod = "GET";
const jsonContentType = "application/json";

const DaysOfWeek = {
    TEAM_A: 'teamA',
    TEAM_B: 'teamB',
    NO_TEAM: 'noTeam'
};

let winnerPlayer = null;
  

const firstTeam =  [0, 1, 2, 3, 4];
const secondTeam =  [128, 129, 130, 131, 132]; 


const sendRequest = (reqContent, options) => {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
          let output = "";
          res.on("data", (d) => {
            output += d;
          });
      
          res.on("end", () => {
            try {
              const jsonOuput = JSON.parse(output);
              resolve(jsonOuput);
            } catch (e) {
              reject(e);
            }
          });
      });

      req.on("error", (error) => {
        reject(error);
      });
    
      req.write(reqContent);
      req.end();
    });
}

const options = (hostname, dotaPath, method, contentType, contentLength) => {
    return {
        hostname: hostname,
        port: 443,
        path: dotaPath,
        method: method
    }
};

const getDotaPath = (userId) => {
    //console.log('url:' + `api/players/${userId}/recentMatches`);
    return `/api/players/${userId}/recentMatches`;
}

const createUserObject = (userInfoResponse) => {
    console.log('userInfoResponse.player_slot::' + userInfoResponse.player_slot);
    const teamType = getTeamType(userInfoResponse.player_slot);
    console.log('teamType:' + teamType);

    let userInfo = {
        'match_id': userInfoResponse.match_id,
        'player_slot': userInfoResponse.player_slot,
        'radiant_win': userInfoResponse.radiant_win,
        'teamType': teamType,
        'isWinner': false
    };

    return userInfo;
}

const compareUserResults = async () => {
    let userAResponse;
    let userBResponse;
    // const userAResponse = await getDotaUserMatchesById(150955045);
    // const userBResponse = await getDotaUserMatchesById(56939869);

    try {
        userAResponse = fs.readFileSync('res.json', 'utf8');
        userBResponse = fs.readFileSync('resB.json', 'utf8');
    } catch(e) {
        console.log('error:' + e);
    } 
  

    const userAInfo = createUserObject(JSON.parse(userAResponse));
    const userBInfo = createUserObject(JSON.parse(userBResponse));

    console.log('userAInfo:' + JSON.stringify(userAInfo));

    if(userAInfo.match_id === userBInfo.match_id) {
        if(userAInfo.teamType !== userBInfo.teamType) {
            console.log('Inside func');

            let players = [];
            players.push(userAInfo);
            players.push(userBInfo);


            // console.log('userAInfo.match_id:::' + userAInfo.match_id);

            // if(userAInfo.teamType === DaysOfWeek.TEAM_A) {
            //     if(userAInfo.radiant_win === true) {
            //         userAInfo.isWinner = true;
            //     }
            // }

            // console.log('userAInfo:::' + JSON.stringify(userAInfo));

            for(let i = 0; i < players.length; i++) {

                
                if(players[i].teamType === DaysOfWeek.TEAM_A) {
                    if(players[i].radiant_win === true) {
                        players[i].isWinner = true;
                    }
                } else if(players[i].teamType === DaysOfWeek.TEAM_B){
                    if(players[i].radiant_win === false) {
                        players[i].isWinner = true;
                    }
                } else {
                    console.log(`user ${user.match_id} do not have team.`);
                }
            }


            for(let i = 0; i < players.length; i++) { 
                
                if(players[i].isWinner) {
                    console.log('userA::' + JSON.stringify(players[i]));
                    winnerPlayer = players[i];

                    console.log('winnerPlayer:::' + JSON.stringify(winnerPlayer));
                }
            }
          
        }   
        
    } 
}

const getTeamType = (playerSlot) => {
    if(firstTeam.includes(Number(playerSlot))) {
        return DaysOfWeek.TEAM_A;
    } else if(secondTeam.includes(Number(playerSlot))) {
        return DaysOfWeek.TEAM_B;
    } else {
        return DaysOfWeek.NO_TEAM;
    }
}



compareUserResults();

console.log('winner:::' + JSON.stringify(winnerPlayer));
