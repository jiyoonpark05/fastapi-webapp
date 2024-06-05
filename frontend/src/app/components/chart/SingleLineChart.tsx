import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

interface TurbineRecord {
  datetime: string;
  power: { unit: string; value: number };
  turbine_id: string;
  wind: { unit: string; value: number };
  _id: string;
}
interface Props {
  data: TurbineRecord[];
}

const SingleLineChart = ({ data }: Props) => {
  const chartData = data.map((dataPoint: TurbineRecord) => {
    const windValue = dataPoint.wind.value;
    const powerValue = dataPoint.power.value;

    return {
      wind: windValue,
      power: powerValue,
      date: dataPoint.datetime,
    };
  });

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minWidth={740}
      minHeight={500}
    >
      <LineChart
        data={chartData}
        id="line-chart"
        margin={{ top: 50, right: 10, bottom: 15, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" fill="white" />
        <XAxis
          type="number"
          dataKey="wind"
          domain={["auto", "auto"]}
          padding={{ left: 10, right: 10 }}
          label={{
            value: "WIND (m/s)",
            offset: 0,
            angle: 0,
            position: "bottom",
          }}
        />
        <YAxis
          type="number"
          dataKey="power"
          domain={["auto", "auto"]}
          label={{
            value: "POWER (kW)",
            offset: 20,
            angle: 0,
            dx: 20,
            position: "top",
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="power"
          stroke="#8884d8"
          activeDot={{ r: 2 }}
          strokeWidth="2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SingleLineChart;
