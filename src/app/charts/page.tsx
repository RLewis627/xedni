"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ResponsiveContainer, ComposedChart, XAxis,
         YAxis, Tooltip, CartesianGrid, Bar, Line
} from "recharts";

type StockData = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export default function ChartsPage() {
  const [data, setData] = useState<StockData[]>([]);

  useEffect(() => {
    // Call to backend to fetch stock data
    axios
      .post("http://127.0.0.1:8000/generate", {
        ticker: "FAKE",
        days: 100,
        start_price: 100,
      })
      .then((res) => { setData(res.data); })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Candlestick Chart Demo</h1>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(v) => v.slice(5, 10)} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
            <Bar dataKey="volume" barSize={10} fill="#82ca9d" yAxisId={1} />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (<p>Loading data...</p>)}
    </div>
  );
}
