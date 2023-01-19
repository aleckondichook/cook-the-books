import React from "react"
import Card from "../components/Card.jsx";

export default function Arb({ odds, bankroll }) {
  return (
    <div className="m-0 mb-24">
      <div className="w-5/6 mx-auto flex justify-start mb-5">
        <h1 className="text-3xl font-bold pb-1 border-b-2 border-gray-200" id="arb-title">Games with Arbitrage Opportunities</h1>
      </div>
      <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
        {odds.map((x) => {
          return x.arb &&
            Card(x, bankroll);
        })}
      </div>
    </div>
  )
}