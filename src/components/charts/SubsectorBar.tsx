"use client";

import ReactECharts from "echarts-for-react";
import { useRouter } from "next/navigation";
import type { Subsector } from "@/lib/types";
import { ENERGY_TYPES } from "@/lib/constants";
import type { EnergyType } from "@/lib/types";

interface SubsectorBarProps {
  subsectors: Subsector[];
  sectorId: string;
}

export function SubsectorBar({
  subsectors,
  sectorId,
}: SubsectorBarProps) {
  const router = useRouter();

  // Get all unique energy types across subsectors
  const allEnergyTypes = Array.from(
    new Set(
      subsectors.flatMap((sub) => sub.energyMix.map((e) => e.energyType))
    )
  );

  const categories = subsectors.map((s) => s.label);

  const series = allEnergyTypes.map((et) => {
    const info = ENERGY_TYPES[et];
    return {
      name: info?.label ?? et,
      type: "bar" as const,
      stack: "total",
      emphasis: { focus: "series" as const },
      itemStyle: { color: info?.color ?? "#9CA3AF" },
      barMaxWidth: 36,
      data: subsectors.map((sub) => {
        const share = sub.energyMix.find((e) => e.energyType === et);
        return share ? share.consumption : 0;
      }),
    };
  });

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: Array<{ seriesName: string; value: number; marker: string }>) => {
        const title = params[0]?.seriesName ? categories[0] : "";
        let html = `<strong>${(params as unknown as { axisValueLabel: string }[])[0]?.axisValueLabel ?? ""}</strong><br/>`;
        let total = 0;
        params.forEach((p) => {
          if (p.value > 0) {
            html += `${p.marker} ${p.seriesName}: ${p.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} TWh<br/>`;
            total += p.value;
          }
        });
        html += `<strong>Total: ${total.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} TWh</strong>`;
        return html;
      },
    },
    legend: {
      bottom: 0,
      left: "center",
      textStyle: { fontSize: 11, color: "#374151" },
      itemWidth: 12,
      itemHeight: 12,
    },
    grid: {
      left: "3%",
      right: "8%",
      top: "3%",
      bottom: 60,
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: (val: number) =>
          val.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " TWh",
        fontSize: 11,
        color: "#6B7280",
      },
      splitLine: { lineStyle: { color: "#F3F4F6" } },
    },
    yAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        fontSize: 12,
        color: "#111827",
        width: 120,
        overflow: "truncate",
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    series,
  };

  const onEvents = {
    click: (params: { dataIndex?: number }) => {
      if (params.dataIndex !== undefined && subsectors[params.dataIndex]) {
        const sub = subsectors[params.dataIndex];
        router.push(`/secteur/${sectorId}/${sub.id}`);
      }
    },
  };

  return (
    <ReactECharts
      option={option}
      onEvents={onEvents}
      style={{ height: Math.max(300, subsectors.length * 60) + "px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
}
