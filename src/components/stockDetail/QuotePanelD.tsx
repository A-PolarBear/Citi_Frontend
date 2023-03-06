import { Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";


// display quote, change & change percent 
function QuotePanelD(props: { quote: any }) {
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
      <div style={{ display: "flex", flexDirection: "column" ,width:"100%"}}>
        <div
          className={`quote ${className}`}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={icon} className="fa-xl"/>
          <span style={{ fontWeight: 600, margin: "0 8px", fontSize: "36px" }}>
            {quote.latestPrice.toFixed(2)}
          </span>
          <span style={{ fontWeight:400,fontSize: "16px" }}>
            {quote.change > 0 ? "+" : ""}
            {quote.change.toFixed(2)}
          </span>
          <span style={{ fontWeight:400,fontSize: "16px" }}>
            ({quote.changePercent.toFixed(2)}%)
          </span>
        </div>
        <div style={{width:"100%"}}>Last Updated at:</div>
      </div>
    );
  }
}

export default QuotePanelD;
