import Submit from "../buttons/Submit";

const BudgetDetailInfo = () => {
  return (
    <form className="" action="">
      <div className="grid grid-cols-2 gap-16">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-black">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="p-1 border-b border-black"
            placeholder="Bread"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cost" className="text-black">
            Cost
          </label>
          <input
            id="cost"
            type="text"
            className="p-1 border-b border-black"
            placeholder="₹56"
          />
        </div>
      </div>
      <Submit process={'Creating'} className="w-full p-2 mt-6 md:py-2">
            <span>Create</span>
        </Submit>
      
    </form>
  );
};

export default BudgetDetailInfo;
