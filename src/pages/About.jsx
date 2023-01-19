import React from "react";
import about_image from ".././images/about_image.png";
import logo from ".././images/ctb_logo.png"

export default function About() {
  return (
    <div className="h-[100vh] lg:h-[150vh]" style={{backgroundImage: `url(${about_image})`}} id="about-background-div">
      <div className="flex lg:justify-center w-5/6 lg:w-1/3 mx-auto mt-72">
        <div className="flex flex-col justify-start w-2/3 lg:w-[100%]">
          <div className="flex flex-col justify-start mb-12">
            <div className="flex flex-row items-end">
              <h1 className="font-bold text-[30px] mr-2">What is Cook the Books?</h1>
              <img src={logo} height="40" width="40"/>
            </div>
            <p className="mt-2 text-[24px] lg:text-[18px]">
              Cook the Books is a web application that provides sport betting arbitrage opportunities.
            </p>
          </div>
          <div className="flex flex-col justify-start mb-12">
            <h1 className="font-bold text-[30px]">Sports Betting Arbitrage?</h1>
            <p className="mt-2 text-[24px] lg:text-[18px]">
              An arbitrage in the context of sports betting is placing multiple bets on the same game to guarantee a profit no matter the result of the game. This is made possible by aggregating the odds of a game from multiple sportsbooks to find opportunities where placing a bet on the same game across different books would secure an arbitrage or guaranteed profit.
            </p>
          </div>
          <div className="flex flex-col justify-start mb-12">
            <h1 className="font-bold text-[30px]">What is the Spread Difference?</h1>
            <p className="mt-2 text-[24px] lg:text-[18px]">
              If the sum of the spreads of a game does not equal 0 (Los Angeles Lakers @ +3 & San Antonio Spurs @ -5), there is a chance that the end result of the game does not result in a win for either of your bets, (Spurs winning by 4). This would end with both of your bets losing, leaving you with $0 instead of a risk-free return. Therefore while there may be an arbitrage opportunity with odds from spread bets, there is also a small chance you could lose it all.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}