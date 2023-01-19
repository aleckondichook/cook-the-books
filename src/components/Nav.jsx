import React from "react"
import colored_logo from ".././images/ctb_logo.png"

export default function Nav() {
  return (
    <nav className="top-0 z-50 h-20 flex justify-center bg-[#F7F7F7] mt-5">
      <div className="flex w-5/6 items-center mx-auto fixed border-b-2 border-gray-200 pb-3">
          <a className="flex center-items pr-10" href="/">
            <img className="h-20 hover:opacity-25" src={colored_logo}/>
            <span className="self-center text-2xl pl-2 font-bold w-72 hover:text-gray-400">Cook the Books</span>
          </a>
          <ul className="flex space-x-8 w-3/4 justify-end pr-7 border-r-2 border-gray-200">
            <li>
              <a className="hover:text-gray-400 text-[20px]" href="/">Home</a>
            </li>
            <li>
              <a className="hover:text-gray-400 text-[20px]" href="/about">About</a>
            </li>
          </ul>
          <div className="flex justify-end ml-5">
            <a href="/odds"><button className="ml-4 mr-4 py-2 px-4 whitespace-nowrap bg-cyan-400 text-white hover:text-black rounded-lg" id="nav-button">Enter App</button></a>
          </div>
      </div>
    </nav>
  )
}