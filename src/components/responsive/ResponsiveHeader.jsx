'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";


export default function Responsive(){
    const [active,setActive]=useState(false)
    function handleClick(){
        setActive(!active)
    }
    return(
        <>
        <button onClick={handleClick} className="mr-4 w-[1.5rem] block md:hidden cursor-pointer">{active ? (<FontAwesomeIcon className="text-2xl" icon={faCircleXmark}/>):(<FontAwesomeIcon className="text-2xl" icon={faEllipsis}/>)}</button>
        {active &&
        <nav className="md:hidden bg-black px-6 py-4 w-full top-14 absolute text-sm flex gap-8 items-center justify-between">
              <Link className="text-white" href={"/transaction"}>Transactions</Link>
              <Link className="text-white" href={"/budget"}>Budgets</Link>
              <Link className="text-white" href={"/goal"}>Goals</Link>
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