"use client";

import ReactECharts from "echarts-for-react";
import type { EnergyShare } from "@/lib/types";

interface EnergyMixDonutProps {
  energyMix: EnergyShare[];
  title?: string;
}

export function EnergyMixDonut({
  energyMix,
  title = "Mix énergétique",
}: EnergyMixDonutProps) {
  const electricityItem = energyMix.find((e) => e.energyType === "electricite");
  const electricityPct = electricityItem
    ? electricityItem.percentage.toFixed(1)
    : "—";

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params: { name: string; value: number; percent: number }) =>
        `<strong>${params.name}</strong><br/>${params.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} TWh<br/>${params.percent.toFixed(1)} %`,
    },
    legend: {
      orient: "horizontal",
      bottom: 0,
      left: "center",
      textStyle: { fontSize: 11, color: "#374151" },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 12,
    },
    title: {
      text: title,
      left: "center",
      top: 0,
      textStyle: {
        fontSize: 15,
        fontWeight: 600,
        color: "#0A1A3F",
      },
    },
    graphic: [
      {
        type: "text",
        left: "center",
        top: "center",
        style: {
          text: `${electricityPct} %\nÉlectricité`,
          textAlign: "center",
          fill: "#1A3FBF",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: 22,
        },
      },
    ],
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        padAngle: 2,
        itemStyle: {
          borderRadius: 4,
        },
        label: { show: false },
        emphasis: {
          label: { show: false },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.2)",
          },
        },
        data: energyMix.map((e) => ({
          name: e.label,
          value: e.consumption,
          itemStyle: {
            color: e.color,
            ...(e.energyType === "electricite"
              ? {
                  borderColor: "#1A3FBF",
                  borderWidth: 2,
                  shadowBlur: 8,
                  shadowColor: "rgba(26,63,191,0.3)",
                }
              : {}),
          },
        })),
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "380px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
}
