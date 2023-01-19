import React from "react";
import logo from ".././images/ctb_logo.png";
import ArbNoSpreadCard from "../components/ArbNoSpreadCard.jsx"

export default function ArbNoSpread({ odds, bankroll }) {

  function arbNoSpreadMap(object) {
    if(!object.arb && !object.spread) {
      return true
    }
  }

  return (
    <div className="m-0 mb-24">
      <div className="w-5/6 mx-auto flex justify-start">
        <h1 className="text-3xl font-bold pb-1 border-b-2 border-gray-200" id="arb-title">Games with an Arbitrage Opportunity but Spread Difference</h1>
      </div>
      <div className="w-5/6 mx-auto mt-2 flex flex-row justify-start items-center">
        <h3 className="text-3xl ml-2 mr-2 mb-1">see </h3>
        <a href="/about" className="flex justify-center" rel="noopener noreferrer" target="_blank">
          <button className="ml-1 mr-4 py-1 px-3 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
            <div className="flex flex-row">
              <span className="mt-1">/about</span>
              <img className="ml-2" src={logo} height="25" width="25" />
            </div>
          </button>
        </a>
        <h3 className="text-3xl mb-1">for more info</h3>
      </div>
      <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
        {odds.map((x) => {
          return arbNoSpreadMap(x) &&
            ArbNoSpreadCard(x, bankroll);
        })}
      </div>
    </div>
  )
}