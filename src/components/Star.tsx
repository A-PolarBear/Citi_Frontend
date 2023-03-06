import { useState } from "react";

function Star(){
    const [ click,setClick] = useState(false);
    return (
        <div style={{display:"flex",justifyContent: "center",alignItems: "center",marginTop:"8px"}}>
        <button onClick={()=>setClick(!click)}>
        <div id="star" className={click?"fill star":"star"}></div>
        </button>
        </div>
    )
}

export default Star;