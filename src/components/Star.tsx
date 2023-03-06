import { useState } from "react";

<<<<<<< HEAD
function Star(){
=======
function Star(props:any){
    const {height,width}=props;
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
    const [ click,setClick] = useState(false);
    return (
        <div style={{display:"flex",justifyContent: "center",alignItems: "center",marginTop:"8px"}}>
        <button onClick={()=>setClick(!click)}>
<<<<<<< HEAD
        <div id="star" className={click?"fill star":"star"}></div>
=======
        <div id="star" className={click?"fill star":"star"} style={{height:height,width:width}}></div>
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
        </button>
        </div>
    )
}

export default Star;