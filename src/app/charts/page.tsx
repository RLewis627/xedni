"use client";

import axios from "axios";
import { useEffect, useState } from "react";
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
        const res = await axios.post("https://xedni-api.vercel.app/v1/generate", {
          ticker: "FAKE",
          days: 100,
          start_price: 50.0,
        });
        setCandles(res.data);
      } catch (err) { console.error(err); }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Trading Playground</h1>
      {candles.length > 0 ? (
        <CandleChart data={candles} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
