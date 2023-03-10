import { Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";


// display quote, change & change percent 
function QuotePanel(props: { quote: any }) {
  const { quote } = props;
  console.log("🚀 ~ file: QuotePanel.tsx:12 ~ QuotePanel ~ quote:", quote)

  if (quote === null || typeof quote === "undefined" || Object.keys(quote).length===0) {
    return <Skeleton style={{width:"40%"}} paragraph={false} active></Skeleton>;
  } else {
    let icon, className;
    if (quote.current >= quote.preClose) {
      icon = faArrowTrendUp;
      className = "price-up";
    } else {
      icon = faArrowTrendDown;
      className = "price-down";
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          className={`quote ${className} flex-col md:flex-row text-right md:items-center pt-2`}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <span className="flex justify-end items-center">
          <FontAwesomeIcon icon={icon} />
          <span style={{ fontWeight: 600, margin: "0 6px" }} className="text-base md:text-2xl">
            {quote.current.toFixed(2)}
          </span>
          </span>
          <span>
          <span style={{ fontSize: "16px" }}>
            {quote.change > 0 ? "+" : ""}
            {quote.change.toFixed(2)}
          </span>
          <span style={{ fontSize: "16px" }}>
            ({quote.percent.toFixed(2)}%)
          </span>
          </span>
        </div>
        <div style={{width:"100%",textAlign: "right"}} className="text-[10px] md:text-xs">Last Updated at:</div>
        <div style={{width:"100%",textAlign: "right"}} className="text-[10px] md:text-xs">{quote.date}</div>
      </div>
    );
  }
}

export default QuotePanel;
