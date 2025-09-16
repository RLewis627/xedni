import numpy as np
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend origin only
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Models ----------
class GenerateRequest(BaseModel):
    ticker: str = "FAKE"
    days: int = 100
    start_price: float = 50.0


class BacktestRequest(BaseModel):
    prices: list[float]
    short_window: int = 5
    long_window: int = 20


# ---------- Endpoints ----------
@app.get("/")
def root():
    return {"message": "Trading Playground API is running"}


# Generate fake stock data using geometric Brownian motion
@app.post("/generate")
def generate_data(req: GenerateRequest):

    np.random.seed(42)  # reproducible for testing
    dt = 1 / 252  # daily steps
    mu = 0.05     # drift
    sigma = 0.2   # volatility

    prices = [req.start_price]
    for _ in range(req.days - 1):
        shock = np.random.normal(loc=(mu - 0.5 * sigma**2) * dt,
                                 scale=sigma * np.sqrt(dt))
        prices.append(prices[-1] * np.exp(shock))

    # Build a fake OHLC dataframe
    dates = [datetime.today() - timedelta(days=i) for i in range(req.days)]
    dates = list(reversed(dates))

    df = pd.DataFrame({
        "date": dates,
        "open": prices,
        "high": [p * (1 + np.random.uniform(0, 0.02)) for p in prices],
        "low": [p * (1 - np.random.uniform(0, 0.02)) for p in prices],
        "close": prices,
        "volume": np.random.randint(1000, 5000, size=req.days)
    })

    return df.to_dict(orient="records")

# Simple moving average crossover strategy, just to start
# Buy when short MA crosses above long MA, sell when it crosses below
@app.post("/backtest")
def backtest(req: BacktestRequest):

    prices = pd.Series(req.prices)

    short_ma = prices.rolling(window=req.short_window).mean()
    long_ma = prices.rolling(window=req.long_window).mean()

    signal = (short_ma > long_ma).astype(int)  # 1 = long, 0 = flat
    returns = prices.pct_change().fillna(0)
    strategy_returns = (signal.shift(1) * returns).fillna(0)

    cumulative_returns = (1 + strategy_returns).cumprod()

    return {
        "cumulative_return": float(cumulative_returns.iloc[-1]),
        "signals": signal.tolist(),
        "equity_curve": cumulative_returns.tolist()
    }
