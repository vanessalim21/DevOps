"use client";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {

    const data = [
        {
            name: "Total",
            count: boys + girls,
            fill: "white",
        },
        {
            name: "Girls",
            count: girls,
            fill: "#e6c994",
        },
        {
            name: "Boys",
            count: boys,
            fill: "#c45335",
        },
    ];
    return (
        <div className="relative w-full h-[75%]">
            <ResponsiveContainer>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="100%"
                    barSize={32}
                    data={data}
                >
                    <RadialBar background dataKey="count" />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CountChart;
