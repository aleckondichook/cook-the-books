import { React, useState, useEffect } from "react"
import axios from "axios";
import logo from ".././images/ctb_logo.png"
import home_image from ".././images/home_image.png";
import HomeCard from "../components/HomeCard.jsx";

export default function Home() {

  const [recents, setRecents] = useState([]);
  
  useEffect(() => {
    async function fetchRecents() {
      const response = await axios.get('/minecraftspeedrun/recent');
      const data = response.data;
      setRecents(data);
      return data;
    }
    fetchRecents();    
  }, []);

  return (
    <div className="flex flex-col bg-[#F7F7F7]">
      <div className="h-[2100px] lg:h-[2200px]" style={{backgroundImage: `url(${home_image})`}} id="background-div">
        <div className="w-5/6 mx-auto mt-[60px] lg:mt-[150px]">
          <h1 className="text-[40px] lg:text-[55px] drop-shadow-lg">Consider the books, cooked</h1>
          <h4 className="mt-3 lg:mt-0 ml-2 w-1/2 wrap">Cook the Books finds arbitrage opportunities across various sportsbooks</h4>
          <a href="/odds"><button className="ml-1 mr-4 py-1 px-3 mt-6 lg:mt-4 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
            <div className="flex flex-row">
              <span className="mt-1">Start Cooking</span>
              <img className="ml-2" src={logo} height="30" width="30" />
            </div>
            </button>
          </a>
        </div>
        <div className="mt-[350px] lg:mt-[620px]">
          <div className="w-5/6 mx-auto flex justify-center  mb-5 ">
            <h1 className="text-2xl lg:text-3xl font-bold pb-1 border-b-2 border-gray-200" id="arb-title">Recent Arbitrage Opportunities found by CTB</h1>
          </div>
          <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
            {recents.map((x) => {
              return HomeCard(x);
            })}
          </div>
        </div>                        
      </div>
    </div>
  )
}