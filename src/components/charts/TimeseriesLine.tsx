"use client";

import ReactECharts from "echarts-for-react";
import type { ElectrificationTimeseries } from "@/lib/types";
import { getSectorColor } from "@/lib/colors";
import { SECTORS } from "@/lib/constants";

interface TimeseriesLineProps {
  data: ElectrificationTimeseries[];
}

export function TimeseriesLine({ data }: TimeseriesLineProps) {
  // Collect all unique years across all series
  const allYears = Array.from(
    new Set(data.flatMap((ts) => ts.dataPoints.map((dp) => dp.year)))
  ).sort((a, b) => a - b);

  const series = data.map((ts) => {
    const sectorMeta = SECTORS.find((s) => s.id === ts.sectorId);
    const color = getSectorColor(ts.sectorId);
    const name = sectorMeta?.label ?? ts.sectorId;

    // Build data aligned with allYears
    const values = allYears.map((year) => {
      const point = ts.dataPoints.find((dp) => dp.year === year);
      return point ? point.electricityShare : null;
    });

    return {
      name,
      type: "line" as const,
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: { width: 2.5, color },
      itemStyle: { color },
      areaStyle: {
        color: {
          type: "linear" as const,
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: color + "20" },
            { offset: 1, color: color + "05" },
          ],
        },
      },
      data: values,
    };
  });

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (
        params: Array<{
          seriesName: string;
          value: number | null;
          marker: string;
          axisValueLabel: string;
        }>
      ) => {
        let html = `<strong>${params[0]?.axisValueLabel ?? ""}</strong><br/>`;
        params.forEach((p) => {
          if (p.value !== null && p.value !== undefined) {
            html += `${p.marker} ${p.seriesName}: ${p.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %<br/>`;
          }
        });
        return html;
      },
    },
    legend: {
      bottom: 0,
      left: "center",
      textStyle: { fontSize: 11, color: "#374151" },
      itemWidth: 16,
      itemHeight: 3,
    },
    grid: {
      left: "3%",
      right: "4%",
      top: "8%",
      bottom: 50,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: allYears.map(String),
      boundaryGap: false,
      axisLabel: { fontSize: 11, color: "#6B7280" },
      axisLine: { lineStyle: { color: "#D1D5DB" } },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (val: number) => `${val} %`,
        fontSize: 11,
        color: "#6B7280",
      },
      splitLine: { lineStyle: { color: "#F3F4F6" } },
      min: 0,
      max: 100,
    },
    series,
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "400px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
}
