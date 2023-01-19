import React, { useState } from "react";
import axios from "axios";
import odds_image from ".././images/odds_image.png";
import APIError from "../components/APIError";
import Arb from "../components/Arb";
import logo from ".././images/ctb_logo.png";
import Spinner from "../components/Spinner";
import ArbNoSpread from "../components/ArbNoSpread";
import NoArbNoSpread from "../components/NoArbNoSpread";
import { findArbs } from "../components/ArbitrageLogic";

export default function Odds() {

  const [odds, setOdds] = useState([])
  const [bankroll, setBankroll] = useState(1000)
  const [sport, setSport] = useState('')
  const [bet, setBet] = useState('')
  const [sportError, setSportError] = useState(false)
  const [betError, setBetError] = useState(false)
  const [arb, setArb] = useState(false)
  const [errorAPI, setErrorAPI] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault();
    if(!sport || !bet) {
      if (!sport) {
        setSportError(true);
      }
      if(!bet) {
        setBetError(true);
      }
    }
    else {
      setSportError(false);
      setBetError(false);
      fetchOdds();
    }
  }
  
  async function fetchOdds() {
    setLoading(current => !current)
    const response = await axios.get(`/minecraftspeedrun/bets/?sport=${sport}&bet=${bet}`);
    if(response.data == "error") {
      setErrorAPI(true);
    }
    else {
      const obj = {...response.data}
      calcArbs(obj);
    }
    setLoading(current => !current)
  }
  
  function calcArbs(obj) {
    const allGames = findArbs(obj)
    setOdds([])
    for (let i in allGames) {
      setOdds((prevOdds) => {
        const newState = [...prevOdds]
        newState.push(allGames[i])
        return newState
      })
    }
    setArb(false)
    for (let i in allGames) {
      if (allGames[i].arb) {
        setArb(current => !current)
        break
      }
    }
  }

  function arbNoSpread() {
    for(let i in odds) {
      if (!odds[i].spread) {
        return true
      }
    }
  }

  function noArbNoSpread() {
    for(let i in odds) {
      if (!odds[i].arb && odds[i].spread) {
        return true
      }
    }
  }

  return (
    <div className="h-[2700px]" style={{backgroundImage: `url(${odds_image})`}} id="background-div">
      <div className="p-7 w-5/6 lg:w-1/3 bg-[#F7F7F7] flex flex-col justify-center mt-48 mb-48 mx-auto rounded" id="card-div-shadow">
        <div className="flex flex-col justify-center">
          <h1 className="mx-auto text-2xl font-bold text-black mb-8 border-b-2 border-cyan-400" id="arb-title">Select a Sport and Type of Bet</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-around ml-0">
              <span>sport (NBA, MLB, or NHL)</span>
              <span>bet (moneyline or spreads)</span>
            </div>
            <div className="flex flex-row justify-around">
              <select className={`rounded py-3 w-48 lg:w-64 ${sportError ? "bg-red-500" : "bg-cyan-300"}`} name="sport" id="sport" onChange={(e) => setSport(e.target.value)}>
                <option hidden></option>
                <option value="basketball_nba">NBA</option>
                <option value="baseball_mlb">MLB</option>
                <option value="icehockey_nhl">NHL</option>
              </select>
              <select className={`rounded py-3 w-48 lg:w-64 ${betError ? "bg-red-500" : "bg-cyan-300"}`} name="bet" id="bet" onChange={(e) => setBet(e.target.value)}>
                <option hidden></option>
                <option value="h2h">moneyline</option>
                <option value="spreads">spreads</option>
              </select>
            </div>
            <div className="flex flex-row justify-around">
              <span className={`${sportError ? "text-red-500" : "text-[#F7F7F7]"} mt-2`}>please select a sport</span>
              <span className={`${betError ? "text-red-500" : "text-[#F7F7F7]"} mt-2`}>please select a bet</span> 
            </div>
            <div className="flex justify-center mb-1 mt-3">
              <span>bankroll (optional)</span>
            </div>
            <div>
              <div className="w-1/2 flex flex-row justify-center mx-auto relative">
                <span className="mr-2">$</span>
                <input type="number" value={bankroll} id="bankroll-input" className="w-36 pl-3 bg-cyan-300 rounded" onChange={(e) => setBankroll(e.target.value)}></input>
              </div>
            </div>
            <a className="flex justify-center" >
              <button className="ml-1 mr-4 py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
                <div className="flex flex-row">
                  <span className="mt-1">find arbs</span>
                  <img className="ml-2" src={logo} height="30" width="30" />
                </div>
              </button>
            </a>
          </form>
          { errorAPI && <APIError /> }
        </div>
      </div>
      <div className="flex justify-center">
        { loading && <Spinner /> }
      </div>
      {arb &&  <Arb odds={odds} bankroll={bankroll} />}
      {arbNoSpread() && <ArbNoSpread odds={odds} bankroll={bankroll} /> }
      {noArbNoSpread() && <NoArbNoSpread odds={odds} bankroll={bankroll} />}
    </div>
  )
}