import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function QuoteChart(props: any) {
  const { data, quote ,stock} = props;
  const [color, setColor] = useState("");

  useEffect(() => {
    if(quote===null) return;
    if (quote.current >= quote.preClose) {
      setColor("#de453d");
    } else {
      setColor("#37d14b");
    }
  }, [quote]);

  if (data === null || quote ===null) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={600}
            height={100}
            data={data}
            margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id={stock} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" hide={true} />
            <YAxis
              type="number"
              allowDecimals={true}
              allowDataOverflow={true}
              domain={["dataMin - 1", "dataMax+1"]}
              hide={true}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="close"
              stroke={color}
              fillOpacity={1}
              fill={`url(#${stock})`}
            />
            <ReferenceLine
              y={quote.preClose}
              stroke={color}
              strokeDasharray="3 3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default QuoteChart;
