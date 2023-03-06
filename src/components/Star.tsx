import { useState } from "react";

function Star(props:any){
    const {height,width}=props;
    const [ click,setClick] = useState(false);
    return (
        <div style={{display:"flex",justifyContent: "center",alignItems: "center",marginTop:"8px"}}>
        <button onClick={()=>setClick(!click)}>
        <div id="star" className={click?"fill star":"star"} style={{height:height,width:width}}></div>
        </button>
        </div>
    )
}

export default Star;