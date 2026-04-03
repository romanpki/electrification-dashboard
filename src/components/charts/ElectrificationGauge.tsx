"use client";

import ReactECharts from "echarts-for-react";

interface ElectrificationGaugeProps {
  value: number;
  title?: string;
}

export function ElectrificationGauge({
  value,
  title = "Taux d'électrification national",
}: ElectrificationGaugeProps) {
  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "70%"],
        radius: "90%",
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.2, "#EF4444"],
              [0.4, "#F59E0B"],
              [0.6, "#10B981"],
              [0.8, "#4F7BE8"],
              [1, "#1A3FBF"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "55%",
          width: 8,
          offsetCenter: [0, "-10%"],
          itemStyle: {
            color: "#0A1A3F",
          },
        },
        axisTick: {
          length: 6,
          lineStyle: { color: "auto", width: 1 },
        },
        splitLine: {
          length: 12,
          lineStyle: { color: "auto", width: 2 },
        },
        axisLabel: {
          color: "#374151",
          fontSize: 11,
          distance: -30,
          formatter: (val: number) => `${val}%`,
        },
        title: {
          show: true,
          offsetCenter: [0, "20%"],
          fontSize: 14,
          color: "#374151",
          fontWeight: 500,
        },
        detail: {
          fontSize: 32,
          fontWeight: "bold",
          offsetCenter: [0, "-30%"],
          valueAnimation: true,
          formatter: (val: number) =>
            val.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " %",
          color: "#0A1A3F",
        },
        data: [
          {
            value: value,
            name: title,
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "300px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
}
