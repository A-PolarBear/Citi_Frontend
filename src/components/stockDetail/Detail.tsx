import { numFormat ,formatNumber} from "../../utils";
function Detail(props:any){
    const { quote } = props;
    const amplitude = ((quote.high-quote.low)*100/quote.preClose).toFixed(2);
    return (
        <div className="detail">
        <ul style={{display:"flex",flexFlow:"row wrap"}}>
            <li><p>Open</p><span>{formatNumber(quote.open.toFixed(3))}</span></li>
            <li><p>High</p><span>{formatNumber(quote.high.toFixed(3))}</span></li>
            <li><p>Low</p><span>{formatNumber(quote.low.toFixed(3))}</span></li>
            <li><p>Prev close</p><span>{formatNumber(quote.preClose.toFixed(3))}</span></li>
            <li><p>Volume</p><span>{numFormat(quote.volume,3)}</span></li>
            <li><p>Amplitude</p><span>{amplitude}%</span></li>
        </ul>
        </div>
    )
}

export default Detail;