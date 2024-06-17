import ButtonNav from "../../components/homeNavigations/navigation";

export default function Home() {
  const linkInfo = [
    // {
    //   id: 1,
    //   className: "bg-black text-white",
    //   title: "Insert Your Transaction",
    //   subtitle: "Quickly record new expenses or income",
    //   link: "/transactions",
    // },
    {
      id: 2,
      className: "border border-black text-black",
      title: "Create Your Budget",
      subtitle: "Set spending limits for different categories",
      link: "/budgets",
    },
    {
      id: 3,
      className: "bg-black text-white",
      title: "Set Your Goal",
      subtitle: "Plan and track financial objectives",
      link: "/goals",
    },
    {
      id: 4,
      className: "border border-black text-black",
      title: "Generate Your Report",
      subtitle: "View insights and analytics on your finances",
      link: "/reports",
    },
  ];
  return (
    <main className="max-w-8xl mx-auto p-6">
      <div className="h-[31vh] grid md:flex items-center text-xl font-semibold text-gray-300">
        <div className="w-full md:w-[50%]">
          <span className="">
            Be <span className="italic">Disciplined</span>. Live Life.
          </span>
        </div>
        <div className="w-full md:w-[50%] text-right">
          <span className="">Ready?</span>
        </div>
      </div>
      {/* The button navigation group after Logging-In*/}
      <div className="h-[50vh] grid grid-rows-2 grid-cols-2 lg:flex gap-4">
        {linkInfo.map((info) => {
          return (
            <ButtonNav
              key={info.id}
              className={info.className}
              title={info.title}
              subtitle={info.subtitle}
              link={info.link}
            />
          );
        })}
      </div>
      {/* The button navigation group after Logging-In*/}
    </main>
  );
}
