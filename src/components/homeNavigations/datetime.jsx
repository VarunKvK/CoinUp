'use client';

import { useState, useEffect } from 'react';

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); // Update every 24 hours

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Format the date
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', // long: "January", short: "Jan"
    day: 'numeric', // numeric: "1", 2-digit: "01"
  });

  return (
    <div className="date-container">
      <p className="text-gray-300 text-xs md:text-sm">{formattedDate}</p>
    </div>
  );
}
