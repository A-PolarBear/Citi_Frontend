function ProfileD(props: { profile: any }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center",whiteSpace:"nowrap"}}>
        <img
          src={props.profile.svg}
          style={{ borderRadius: "24px", height: "48px" }}
          alt=""
        />
        <span style={{ margin: "8px" ,marginLeft:"24px"}}>
          <h2 style={{ fontWeight: 600, fontSize: "32px",textTransform:"uppercase"}}>
            {props.profile.stockName}
          </h2>
          <h2>{props.profile.stockCode}</h2>
        </span>
      </div>
    </>
  );
}

export default ProfileD;
