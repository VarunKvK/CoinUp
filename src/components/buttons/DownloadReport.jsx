'use client'
import GenerateReport from "@/actions/GenerateReport";

export default function DownloadReport({children, className= " ",process }) {
  async function downloadReport(){
    await GenerateReport() 
  }
  
  return (
    <button
      onClick={downloadReport}
      type="submit"
      className={
        "disabled:bg-gray-600 disabled:text-gray-200 text-white bg-black px-2 py-1 rounded-lg " +
        className
      }
    >
      {children}
    </button>
  );
}
