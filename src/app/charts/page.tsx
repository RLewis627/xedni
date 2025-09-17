"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ResponsiveContainer, ComposedChart, XAxis,
         YAxis, Tooltip, CartesianGrid, Bar, Line
} from "recharts";
import CandleChart from "@/components/CandleChart";

type Candle = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export default function ChartsPage() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [signals, setSignals] = useState<{ index: number; type: "buy" | "sell" }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get fake stock data
        const res = await axios.post("http://127.0.0.1:8000/generate", {
          ticker: "FAKE",
          days: 100,
          start_price: 100,
        });
        setCandles(res.data);

        // send closing prices to /backtest
        const closes = res.data.map((d: Candle) => d.close);
        const backtestRes = await axios.post("http://127.0.0.1:8000/backtest", {
          prices: closes,
          short_window: 5,
          long_window: 20,
        });

        // convert signals trade markers
        const rawSignals: number[] = backtestRes.data.signals;
        const markers: { index: number; type: "buy" | "sell" }[] = [];

        for (let i = 1; i < rawSignals.length; i++) {
          if (rawSignals[i] === 1 && rawSignals[i - 1] === 0)
            markers.push({ index: i, type: "buy" });
          else if (rawSignals[i] === 0 && rawSignals[i - 1] === 1)
            markers.push({ index: i, type: "sell" });
        }
        setSignals(markers);
      } catch (err) { console.error(err); }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Trading Playground</h1>
      {candles.length > 0 ? (
        <CandleChart data={candles} signals={signals} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
