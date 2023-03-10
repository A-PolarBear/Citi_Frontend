import { Skeleton } from "antd";

// display icon, symbol & name
function Profile(props: { profile: any }) {
  if (props.profile == null || props.profile === undefined) {
    return <Skeleton style={{width:"30%"}}></Skeleton>;
  } else {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center" ,whiteSpace:"nowrap"}}>
          <img
            src={props.profile.svg}
            style={{ borderRadius: "24px", height: "48px" }}
            alt=""
          />
          <span style={{ margin: "8px" }}>
            <h2 style={{ fontWeight: 600, fontSize: "24px" }}>
              {props.profile.stockCode}
            </h2>
            <h2>{props.profile.stockName}</h2>
          </span>
        </div>
      </>
    );
  }
}

export default Profile;
