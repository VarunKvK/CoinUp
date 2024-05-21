export default function DataInput({children,className=" "}){
    return (
        <div className={"border border-black rounded-lg"+className}>
            <div className="p-2 md:p-4 grid grid-rows-2 gap-4 md:gap-10">
            {children}
            </div>
        </div>
    )
}