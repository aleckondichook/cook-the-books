import React from "react";
import logos from "../utils/logos.json"

export default function NoArbCard(x, bankroll) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  function getLogo(team) {
    for (let i in logos) {
      if (team == logos[i].team) {
        return logos[i].info.url
      }
    }
    return "https://cdn.anime-pictures.net/previews/f59/f591ed67a9d7530d11e6b54865760063_sp.jpg"
  }

  function lossAmount(homeLine, awayLine) {
    let loss = formatter.format(-(bankroll - ((bankroll / homeLine) + (bankroll / awayLine))));
    return loss;
  }

  return (
    <div className="bg-[#F7F7F7] h-[400px] w-[550px] flex flex-col shrink-0 mb-96 mr-10 ml-2 mt-2 rounded" key={x.home.id} id="card-div-shadow">
      <h2 className="border-b-2 border-gray-200 mx-auto text-2xl mt-5 text-red-500">no return &#128542;</h2>
      <div className="mx-auto h-32 w-5/6 flex flex-row items-center mb-5">
        <img className="" src={getLogo(x.home.name)} />
        <p className="flex justify-center w-[400px]">{x.home.name}</p>
      </div>
      <div className="mx-auto h-32 w-5/6 flex flex-row items-center border-t-2 border-gray-200">
        <img className="" src={getLogo(x.away.name)} />
        <p className="flex justify-center w-[400px]">{x.away.name}</p>
      </div>
      <h2 className="border-b-2 border-gray-200 mx-auto text-lg mt-2 mb-5">would have been a <b>{lossAmount(x.home.line, x.away.line)}</b> loss</h2>
    </div>
  )
}