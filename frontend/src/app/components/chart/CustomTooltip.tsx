import { TooltipProps } from "recharts";
export interface PayloadItem {
  payload: any;
  value: number;
}

export interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: PayloadItem[];
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dateTime = payload[0].payload.date;
    const date = dateTime.slice(0, 10);
    const time = dateTime.slice(11, 16);
    return (
      <div className="custom-tooltip bg-gray-900 bg-opacity-10 p-2">
        <p className="label text-sm font-bold pb-1.5">{`${date}`}</p>
        <p className="label text-sm">{`time : ${time}`}</p>
        <p className="label text-sm">{`wind : ${label} m/s`}</p>
        <p className="label text-sm">{`power : ${payload[0].value} kW`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
