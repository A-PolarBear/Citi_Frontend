import { useState } from "react";

function Star(props:any){
    const {height,width,status}=props;
    const [ click,setClick] = useState(status);
    return (
        <span style={{display:"flex",justifyContent: "center",alignItems: "center",marginTop:"8px"}}>
        <button onClick={()=>setClick(!click)}>
        <div id="star" className={click?"fill star":"star"} style={{height:height,width:width}}></div>
        </button>
        </span>
    )
}

export default Star;