"use client";

import { faCalendar, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const generateMonthlyData = (rawData) => {
  const year = new Date().getFullYear();
  const monthlyData = months.map((month, index) => {
    const data = rawData.find((item) => item._id.month === index + 1) || {
      totalAmount: 0,
    };
    return {
      month: `${month}`,
      totalAmount: data.totalAmount,
    };
  });
  return monthlyData;
};

export default function GraphVisuals() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await fetch("/api/graphdata");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (!Array.isArray(result?.result)) {
          throw new Error("API response is not an array");
        }
        const formattedData = generateMonthlyData(result?.result);
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchGraph();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip grid grid-rows-2 gap-2"
          style={{
            backgroundColor: "#000",
            padding: "1.5rem",
            borderRadius: "12px",
            color: "#fff",
          }}
        >
          <div className="flex items-center text-white gap-1">
            <FontAwesomeIcon icon={faCalendar} />
            <p className="label">{`Month: ${label}`}</p>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faMoneyBill} />
            <p className="intro">{`Total Amount: ₹${payload[0].value}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart width={900} height={250} data={data}>
        <CartesianGrid
          vertical={false}
          strokeWidth={2}
          stroke="#d3d3d3"
          strokeDasharray="1 2"
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: "#aaaa" }}
        />
        <YAxis
          axisLine={false}
          tickMargin={10}
          tickLine={false}
          tick={{ fill: "#000" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="totalAmount"
          stroke="#000"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
