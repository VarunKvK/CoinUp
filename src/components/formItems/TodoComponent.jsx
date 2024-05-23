import CheckBox from "../buttons/CheckBox";
import ToDoForm from "../forms/ToDoForm";

export default function TodoComponent({tasks}) {
  // console.log(tasks);
  return (
    <div className="p-4 row-span-2 border border-black rounded-xl">
      <div className="p-2 ">
        <h1 className="text-2xl mb-4">
          Weekly <span className="italic font-medium">Goals</span>
        </h1>
        <div className="max-h-48 overflow-y-auto rounded scrollbar-goal-thin">
          {tasks?.map((t) => (
            <div
              key={t._id}
              className="p-2 border-b border-gray-200 flex items-center last:border-b-0"
            >
              <CheckBox checked={t.completed} index={t._id.toString()} />
              {t.title}
            </div>
          ))}
        </div>
      </div>
      <ToDoForm />
    </div>
  );
}
