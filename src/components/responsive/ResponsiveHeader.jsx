'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

export default function Responsive() {
  const [active, setActive] = useState(false);
  const navRef = useRef(null);

  const handleClick = () => {
    setActive(!active);
  };

  const handleClickOutside = useCallback((event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active, handleClickOutside]);

  return (
    <>
      <button onClick={handleClick} className="mr-4 w-[1.5rem] block md:hidden cursor-pointer">
        {active ? (
          <FontAwesomeIcon className="text-2xl" icon={faCircleXmark} />
        ) : (
          <FontAwesomeIcon className="text-2xl" icon={faEllipsis} />
        )}
      </button>
      {active && (
        <nav ref={navRef} className="md:hidden bg-black px-6 py-4 w-full top-14 absolute text-sm flex gap-8 items-center justify-between">
          <Link className="text-white" href={"/budgets"}>Budgets</Link>
          <Link className="text-white" href={"/goals"}>Goals</Link>
          <Link className="text-white" href={"/dashboard"}>Dashboard</Link>
        </nav>
      )}
    </>
  );
}
