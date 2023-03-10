function ProfileD(props: { profile: any }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center"}}>
        <img
          src={props.profile.svg}
          alt=""
          className="h-6 rounded-xl md:h-8 md:rounded-2xl"
        />
        <span style={{ margin: "8px" }} className="ml-2 md:ml-6">
          <h2 style={{ fontWeight: 600,textTransform:"uppercase"}} className="text-lg md:text-3xl">
            {props.profile.stockName}
          </h2>
          <h2>{props.profile.stockCode}</h2>
        </span>
      </div>
    </>
  );
}

export default ProfileD;
