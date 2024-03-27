import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "@/components/dash_components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "@/components/dash_components/variables/charts";
import LineChart from "@/components/dash_components/charts/LineChart";

const TotalSpent = ({ dataMonth }) => {
  let data = [];
  for (let i = 1; i < 13; i++) {
    if (dataMonth[i] === null) {
      data.push(0);
      continue;
    }
    data.push(dataMonth[i].total_amount);
  }
  lineChartDataTotalSpent[0].data = data;
  const date = new Date();
  let curentMonth = date.getMonth();
  let monthAmount;
  for (let i = 0; i < data.length; i++) {
    if (i === curentMonth) {
      monthAmount = data[i];
    }
  }
  data = [];
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">This month</span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {monthAmount} DH
          </p>
        </div>
        <div className="h-full w-full">
          <LineChart
            chartOptions={lineChartOptionsTotalSpent}
            chartData={lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
