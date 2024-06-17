'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";


export default function Responsive(){
    const [active,setActive]=useState(false)
    const navRef=useRef(null)

    function handleClick(){
        setActive(!active)
    }

    function handleClickOutside(event){
      if(navRef.current && !navRef.current.contains(event.target)){
        setActive(false)
        console.log(active)
      }
    }

    useEffect(() => {
      if (active) {
          document.addEventListener('mousedown', handleClickOutside);
          console.log(active)
      } else {
          document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [active]);
    return(
        <>
        <button onClick={handleClick} className="mr-4 w-[1.5rem] block md:hidden cursor-pointer">{active ? (<FontAwesomeIcon className="text-2xl" icon={faCircleXmark}/>):(<FontAwesomeIcon className="text-2xl" icon={faEllipsis}/>)}</button>
        {active &&
        <nav ref={navRef} className="md:hidden bg-black px-6 py-4 w-full top-14 absolute text-sm flex gap-8 items-center justify-between">
              <Link className="text-white" href={"/budgets"}>Budgets</Link>
              <Link className="text-white" href={"/goals"}>Goals</Link>
              <Link
                className="text-white"
                href={"/dashboard"}
              >
                Dasboard
              </Link>
            </nav>
        }
        </>
    )
}