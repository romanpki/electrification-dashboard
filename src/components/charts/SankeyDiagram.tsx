"use client";

import ReactECharts from "echarts-for-react";
import type { SankeyData } from "@/lib/types";
import { WAVESTONE } from "@/lib/constants";

interface SankeyDiagramProps {
  data: SankeyData;
  height?: number;
}

const SANKEY_COLORS = [
  WAVESTONE.bleuVibrant,
  WAVESTONE.bleuClair,
  WAVESTONE.orange,
  "#EF4444",
  WAVESTONE.vertAccent,
  "#8B5CF6",
  "#F59E0B",
  WAVESTONE.bleuFonce,
  WAVESTONE.gris500,
  "#EC4899",
];

export function SankeyDiagram({ data, height = 500 }: SankeyDiagramProps) {
  const option = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      formatter: (params: {
        dataType: string;
        name?: string;
        data?: { source?: string; target?: string; value?: number };
        value?: number;
      }) => {
        if (params.dataType === "edge") {
          const val = params.data?.value ?? 0;
          return `${params.data?.source} → ${params.data?.target}<br/><strong>${val.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} TWh</strong>`;
        }
        return `<strong>${params.name}</strong>`;
      },
    },
    series: [
      {
        type: "sankey",
        layout: "none",
        emphasis: {
          focus: "adjacency",
        },
        lineStyle: {
          color: "gradient",
          curveness: 0.5,
          opacity: 0.4,
        },
        nodeAlign: "left",
        nodeGap: 12,
        nodeWidth: 20,
        label: {
          fontSize: 12,
          color: "#111827",
          fontWeight: 500,
        },
        itemStyle: {
          borderWidth: 0,
        },
        data: data.nodes.map((node, i) => ({
          name: node.name,
          itemStyle: {
            color: SANKEY_COLORS[i % SANKEY_COLORS.length],
          },
        })),
        links: data.links.map((link) => ({
          source: typeof link.source === 'string' ? link.source : data.nodes[link.source]?.name,
          target: typeof link.target === 'string' ? link.target : data.nodes[link.target]?.name,
          value: link.value,
        })),
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, minHeight: `${height}px`, width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
}
