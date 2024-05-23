import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TipsComponent() {
  return (
    <div className="bg-black p-6 rounded-lg">
      <h1 className="text-white text-2xl">Tips for you</h1>
      <div className="mt-2 grid grid-auto gap-2 max-h-[105px] overflow-y-auto rounded scrollbar-thin">
        <li className="list-none text-white text-sm p-1 border-b border-gray-200 last:border-b-0 ">
          To change the username, just click on{" "}
          <span className="font-semibold flex gap-1 items-center">
            ' Edit Username
            <FontAwesomeIcon icon={faPencil} className="text-white" />'
          </span>
        </li>
        <li className="list-none text-white text-sm p-1 border-b border-gray-200 last:border-b-0">To get the 'Balance' after updating your income just refresh the page.</li>
      </div>
    </div>
  );
}
