"use client";

import Image from "next/image";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Jan",
        income: 3000,
        expense: 2200,
    },
    {
        name: "Feb",
        income: 4000,
        expense: 2600,
    },
    {
        name: "Mar",
        income: 5000,
        expense: 4200,
    },
    {
        name: "Apr",
        income: 8000,
        expense: 4500,
    },
    {
        name: "May",
        income: 7000,
        expense: 5000,
    },
    {
        name: "Jun",
        income: 7500,
        expense: 3800,
    },
    {
        name: "Jul",
        income: 3000,
        expense: 1900,
    },
    {
        name: "Aug",
        income: 2900,
        expense: 2000,
    },
    {
        name: "Sep",
        income: 6000,
        expense: 4000,
    },
    {
        name: "Oct",
        income: 5500,
        expense: 4500,
    },
    {
        name: "Nov",
        income: 7000,
        expense: 4000,
    },
    {
        name: "Dec",
        income: 7000,
        expense: 5000,
    },
];

const FinanceChart = () => {
    return (
      <div className="bg-white rounded-xl w-full h-full p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Finance</h1>
        </div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#847577" }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#847577" }}
              tickLine={false}
              tickMargin={20}
            />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{
                paddingTop: "10px",
                paddingBottom: "30px",
              }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#008585"
              strokeWidth={5}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#74a892"
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
};

export default FinanceChart;
