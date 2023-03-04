
// display icon, symbol & name
function Profile(props: { profile: any; }){
    return (
        <>
        <div style={{display:"flex",alignItems: "center"}}>
        <img src={props.profile.svg} style={{borderRadius:"24px",height:"48px"}} alt=""/>
            <span style={{margin:"8px"}}> 
            <h2 style={{fontWeight:600,fontSize:"24px"}}>{props.profile.stockCode}</h2>
            <h2>{props.profile.stockName}</h2>
            </span>
        </div>
            
        </>
    )
}

export default Profile;