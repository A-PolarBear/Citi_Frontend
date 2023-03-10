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
          className={`quote ${className}`}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={icon} />
          <span style={{ fontWeight: 600, margin: "0 6px", fontSize: "24px" }}>
            {quote.current.toFixed(2)}
          </span>
          <span style={{ fontSize: "16px" }}>
            {quote.change > 0 ? "+" : ""}
            {quote.change.toFixed(2)}
          </span>
          <span style={{ fontSize: "16px" }}>
            ({quote.percent.toFixed(2)}%)
          </span>
        </div>
        <div style={{width:"100%",textAlign: "right"}}>Last Updated at:</div>
        <div style={{width:"100%",textAlign: "right"}}>{quote.date}</div>
      </div>
    );
  }
}

export default QuotePanel;
