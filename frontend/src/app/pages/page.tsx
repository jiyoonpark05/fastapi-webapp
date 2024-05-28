"use client";
import { API } from "config";
import { ChangeEvent, useEffect, useState } from "react";
import SingleLineChart from "../components/chart/SingleLineChart";
import Spinner from "../components/common/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PowerCurve = () => {
  const [turbineId, setTurbineId] = useState<string>("Turbine1");
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2016-01-01 01:30"),
    endDate: new Date("2016-01-01 03:30"),
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, -1);
  };

  const fetchData = async () => {
    setIsLoading(true);

    const params = new URLSearchParams({
      turbine_id: turbineId,
      start_date: formatDate(dateRange.startDate),
      end_date: formatDate(dateRange.endDate),
    });

    try {
      const url = `${API.TURBINE}${params.toString()}`;
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTurbineChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTurbineId(event.target.value);
  };

  const handleDateChange = (date: Date | null, type: string) => {
    if (!date) {
      return;
    }

    if (type === "start") {
      if (date > dateRange.endDate) {
        alert("End date has been adjusted to match the new start date.");
        return;
      }
      setDateRange((prev) => ({ ...prev, startDate: date }));
    }

    if (type === "end") {
      if (date < dateRange.startDate) {
        alert("End date cannot be before start date.");
        return;
      }
      setDateRange((prev) => ({ ...prev, endDate: date }));
    }
  };

  return (
    <div className="w-full">
      <p className="text-2xl font-bold text-white">power curve</p>
      <div className="w-full min-w-[750px] flex items-center justify-between my-4 ">
        <select
          className="rounded-md"
          id="turbineId"
          onChange={handleTurbineChange}
          value={turbineId}
        >
          <option value="Turbine1">Turbine1</option>
          <option value="Turbine2">Turbine2</option>
        </select>
        <div className="flex items-center gap-x-2 text-white">
          <p className="text-base">period</p>
          <div>
            <DatePicker
              className="w-36 rounded-lg text-black"
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              selected={dateRange.startDate}
              onChange={(date) => handleDateChange(date, "start")}
            />
            <span className="px-1">~</span>
            <DatePicker
              className="w-36 rounded-lg text-black"
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              selected={dateRange.endDate}
              onChange={(date) => handleDateChange(date, "end")}
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-gray-900 opacity-[0.75] py-1.5 px-3 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:opacity-[1]"
            onClick={fetchData}
          >
            search
          </button>
        </div>
      </div>
      <div className="w-full min-h-96">
        {isLoading ? (
          <div className="flex w-full min-h-96 items-center justify-center">
            <Spinner />
          </div>
        ) : data.length === 0 ? (
          <div className="flex w-full min-h-96 items-center justify-center text-white">
            No data available, Check the data range
          </div>
        ) : (
          <SingleLineChart data={data} />
        )}
      </div>
    </div>
  );
};

export default PowerCurve;
