import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";


function QuoteChart(props:any) {
    const {data}=props;
  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        width={400}
        height={100}
        margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
      >
        <YAxis type="number" allowDecimals={true} allowDataOverflow={true} domain={[143,147]} hide={true}/>
        <Tooltip />
        <Line type="monotone" dataKey="open" stroke="#1890bf" dot={false} strokeWidth={2}/>
      </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default QuoteChart;
