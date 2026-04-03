"use client";

import ReactECharts from "echarts-for-react";
import { useRouter } from "next/navigation";
import type { Sector } from "@/lib/types";
import { getSectorColor } from "@/lib/colors";

interface SectorTreemapProps {
  sectors: Sector[];
}

export function SectorTreemap({ sectors }: SectorTreemapProps) {
  const router = useRouter();

  const totalTWh = sectors.reduce((sum, s) => sum + s.totalConsumption, 0);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params: { name: string; value: number }) => {
        const pct = ((params.value / totalTWh) * 100).toFixed(1);
        return `<strong>${params.name}</strong><br/>${params.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} TWh<br/>${pct} % du total`;
      },
    },
    series: [
      {
        type: "treemap",
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        label: {
          show: true,
          formatter: (params: { name: string; value: number }) => {
            const pct = ((params.value / totalTWh) * 100).toFixed(1);
            return `{name|${params.name}}\n{value|${params.value.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} TWh}\n{pct|${pct} %}`;
          },
          rich: {
            name: { fontSize: 16, fontWeight: "bold", color: "#fff", lineHeight: 24 },
            value: { fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 20 },
            pct: { fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 18 },
          },
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 3,
          gapWidth: 2,
        },
        data: sectors.map((s) => ({
          name: s.label,
          value: s.totalConsumption,
          sectorId: s.id,
          itemStyle: {
            color: getSectorColor(s.id),
            cursor: "pointer",
          },
        })),
      },
    ],
  };

  const onEvents = {
    click: (params: { data?: { sectorId?: string } }) => {
      const sectorId = params.data?.sectorId;
      if (sectorId) {
        router.push(`/secteur/${sectorId}`);
      }
    },
  };

  return (
    <ReactECharts
      option={option}
      onEvents={onEvents}
      style={{ height: "400px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
}
