import { Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";


// display quote, change & change percent 
function QuotePanel(props: { quote: any }) {
  const { quote } = props;

  if (quote === null || typeof quote === "undefined") {
    return <Skeleton></Skeleton>;
  } else {
    let icon, className;
    if (quote.latestPrice >= quote.previousClose) {
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
          <span style={{ fontWeight: 600, margin: "0 8px", fontSize: "28px" }}>
            {quote.latestPrice.toFixed(2)}
          </span>
          <span style={{ fontSize: "16px" }}>
            {quote.change > 0 ? "+" : ""}
            {quote.change.toFixed(2)}
          </span>
          <span style={{ fontSize: "16px" }}>
            ({quote.changePercent.toFixed(2)}%)
          </span>
        </div>
        <div>Last Updated at:</div>
      </div>
    );
  }
}

export default QuotePanel;
