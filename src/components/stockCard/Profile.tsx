import { Skeleton } from "antd";

// display icon, symbol & name
function Profile(props: { profile: any }) {
  if (props.profile == null || props.profile === undefined) {
    return <Skeleton style={{width:"30%"}}></Skeleton>;
  } else {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center" }} className="w-2/4 md:w-2/5">
          <img
            src={props.profile.svg}
            className="h-6 rounded-xl md:h-8 md:rounded-2xl"
            alt=""
          />
          <span style={{ margin: "8px" ,width:"100%"}}>
            <h2 style={{ fontWeight: 600 }} className="text-lg md:text-2xl">
              {props.profile.stockCode}
            </h2>
            <h2 className="w-4/5 text-xs text-ellipsis overflow-hidden whitespace-nowrap">{props.profile.stockName}</h2>
          </span>
        </div>
      </>
    );
  }
}

export default Profile;
