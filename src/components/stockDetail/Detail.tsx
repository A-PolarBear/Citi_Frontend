import { numFormat } from "../../utils";
function Detail(props:any){
    const { quote } = props;
    return (
        <div className="detail">
        <ul style={{display:"flex"}}>
            <li><p>Open</p><span>{quote.open}</span></li>
            <li><p>High</p><span>{quote.high}</span></li>
            <li><p>Low</p><span>{quote.low}</span></li>
            <li><p>Prev close</p><span>{quote.lastclose}</span></li>
            <li><p>Volume</p><span>{numFormat(quote.volume,3)}</span></li>
        </ul>
        </div>
    )
}

export default Detail;