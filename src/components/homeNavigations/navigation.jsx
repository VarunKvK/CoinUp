import Link from "next/link";

export default function ButtonNav({className="",title,subtitle,link}){
    return(
        <Link href={link} className={"h-full w-full md:w-[25%]"}>
        <div className={"h-full w-full rounded-xl p-8 relative "+className}>
          <h1 className="font-semibold text-2xl md:text-4xl">{title}</h1>
          <p className="font-regular text-xs md:text-lg absolute bottom-6 w-[80%] md:w-[65%]">{subtitle}</p>
        </div>
        </Link>
    )
}