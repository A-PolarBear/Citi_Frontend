import { useEffect, useRef, useState } from "react";
import FavouritesAPI from "../api/Favourites"

function Star(props:any){
    const {height,width,stockCode,status}=props;
    const [ click,setClick] = useState(status);
    const firstUpload = useRef(true) ;

    useEffect(()=>{
        if (firstUpload.current) {
            firstUpload.current = false
            return;
        }
        if(click){
            FavouritesAPI.addFavourites(stockCode);
        }
        else{
            FavouritesAPI.deleteFavourites(stockCode);
        }
    },[click])

    return (
        <span style={{display:"flex",justifyContent: "center",alignItems: "center",marginTop:"8px"}}>
        <button onClick={()=>setClick(!click)} style={{border:"none",background:"transparent",cursor:"pointer"}}>
        <div id="star" className={click?"fill star":"star"} style={{height:height,width:width}}></div>
        </button>
        </span>
    )
}

export default Star;