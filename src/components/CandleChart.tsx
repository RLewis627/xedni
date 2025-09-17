"use client";

import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

type Candle = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type Signal = {
  index: number;
  type: "buy" | "sell";
};

interface Props {
  data: Candle[];
  signals?: Signal[];
}

export default function CandleChart({ data, signals = [] }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#333",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      crosshair: {
        mode: 0,
      },
    });

    // candlestick series
    const candleSeries = chart.addSeries(CandlestickSeries);
    candleSeries.setData(
      data.map((d) => ({
        time: d.date.split("T")[0], // use YYYY-MM-DD
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }))
    );

    // overlay buy/sell markers
    signals.forEach((s) => {
      const candle = data[s.index];
      candleSeries.createPriceLine({
        price: s.type === "buy" ? candle.low : candle.high,
        color: s.type === "buy" ? "green" : "red",
        lineWidth: 2,
        lineStyle: 2,
        axisLabelVisible: true,
        title: s.type.toUpperCase(),
      });
    });

    return () => chart.remove();
  }, [data, signals]);

  return <div ref={chartContainerRef} className="w-full h-[500px]" />;
}
