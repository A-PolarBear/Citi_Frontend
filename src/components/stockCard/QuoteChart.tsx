import { Skeleton } from "antd";
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
  const { data } = props;

  if (data === null) {
    return <Skeleton active/>;
  } else {
    const firstClose = data[0].close;
    const currentClose = data[data.length - 1].close;
    let color = undefined;
    if (firstClose < currentClose) {
      color = "#de453d";
    } else {
      color = "#37d14b";
    }
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
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#color)"
            />
            <ReferenceLine
              y={firstClose}
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
