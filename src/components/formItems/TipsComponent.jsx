import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TipsComponent() {
  return (
    <div className="bg-black p-6 rounded-lg row-span-2">
      <h1 className="text-white text-2xl">Tips for you</h1>
      <div className="mt-2 grid grid-auto gap-2 max-h-48 overflow-y-auto rounded scrollbar-thin">
        <li className="list-none text-white text-sm p-1 mb-2 border-b border-gray-200 last:border-b-0">
          To change the username, just click on
          <span className="font-semibold flex gap-1 items-center">
            &apos; Edit Username
            <FontAwesomeIcon icon={faPencil} className="text-white" />&apos;
          </span>
        </li>
        <li className="list-none mb-2 text-white text-sm p-1 border-b border-gray-200 last:border-b-0">
          To get the &apos;Balance&apos; after updating your income just refresh the page.
        </li>
        <li className="list-none mb-2 text-white text-sm p-1 border-b border-gray-200 last:border-b-0">
          Detailed Budget Expenses are available by hovering on the &apos;Monthly Budget Expenses Graph&apos;.
        </li>
      </div>
    </div>
  );
}
