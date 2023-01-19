import axios from "axios"

export function findArbs(obj) {
  const allGames = []
  for (let game in obj) {
    let gameObject = {}
    let homeObject = {}
    let awayObject = {}
    let homeOddsArray = []
    let awayOddsArray = []
    for (let book in obj[game]["bookmakers"]) {
      if (obj[game]["bookmakers"][book]["key"] == "betfair") {
        continue
      }
      const bookCut = obj[game]["bookmakers"][book]
      const outcomesCut = bookCut["markets"][0]["outcomes"]
      if (bet == "spreads") {
        homeObject = {
          "name": outcomesCut[0]["name"],
          "book": bookCut["title"],
          "line": outcomesCut[0]["price"],
          "id": obj[game]["id"],
          "spread": outcomesCut[0]["point"]
        }
        awayObject = {
          "name": outcomesCut[1]["name"],
          "book": bookCut["title"],
          "line": outcomesCut[1]["price"],
          "id": obj[game]["id"],
          "spread": outcomesCut[1]["point"]
        }
      }
      else {
        homeObject = {
          "name": outcomesCut[0]["name"],
          "book": bookCut["title"],
          "line": outcomesCut[0]["price"],
          "id": obj[game]["id"]
        }
        awayObject = {
          "name": outcomesCut[1]["name"],
          "book": bookCut["title"],
          "line": outcomesCut[1]["price"],
          "id": obj[game]["id"]
        }
      }
      homeOddsArray.push(homeObject)
      awayOddsArray.push(awayObject)
    }
    if(homeOddsArray.length === 0) {
      continue
    }
    const opp = homeOddsArray.reduce(function (prev, current) {
      return (prev.line > current.line) ? prev : current
    })
    const awayOpp = awayOddsArray.reduce(function (prev, current) {
      return (prev.line > current.line) ? prev : current
    })
    const arb = (1 / opp.line) + (1 / awayOpp.line)
    if (arb > 1) {
      gameObject = {
        "home": opp,
        "away": awayOpp,
        "arb": false,
        "spread": true
      }
    }
    else {
      gameObject = {
        "home": opp,
        "away": awayOpp,
        "arb": true,
        "spread": true
      }
      if (bet == "spreads") {  
        if (opp.spread+awayOpp.spread != 0) {
          gameObject = {
            "home": opp,
            "away": awayOpp,
            "arb": false,
            "spread": false
          }
        }
      }
    }
    allGames.push(gameObject)
    if (profitPercentage(gameObject.home.line, gameObject.away.line) > 25) {
      uploadToDB(gameObject);
    }
  }
  return allGames
}

function profitPercentage(homeLine, awayLine) {
  return (100 * (1000 - ((1000 / homeLine) + (1000 / awayLine))) / ((1000 / homeLine) + (1000 / awayLine))).toFixed(2)
};

async function uploadToDB(gameObject) {
  await axios.post('/minecraftspeedrun/db', gameObject);
};