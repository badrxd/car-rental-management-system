import Card from "@/components/dash_components/card";
import BarChart from "@/components/dash_components/charts/BarCharts";
import {
  barChartDataWeeklyRevenue,
  barChartOptionsWeeklyRevenue,
} from "@/components/dash_components/variables/charts";
import { MdBarChart } from "react-icons/md";

const WeeklyRevenue = ({ dataMonth }) => {
  let data = [];
  for (let i = 1; i < 13; i++) {
    if (dataMonth[i] === null) {
      data.push(0);
      continue;
    }
    data.push(dataMonth[i].total_rented_cars);
  }
  barChartDataWeeklyRevenue[0].data = data;
  data = [];
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Year Reservations
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          <BarChart
            chartData={barChartDataWeeklyRevenue}
            chartOptions={barChartOptionsWeeklyRevenue}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
