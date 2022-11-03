
import UseFetch from "./useFetch";
import { loading , handleError } from "../utility";

export default function Ipapi(callback){
    const endPoint = "https://ipapi.co/json";
    let userInfo = UseFetch(endPoint);
    let result = userInfo.data?.currency;

    let setDefultCurrency = result? result.toLowerCase() :"inr";
 

    return(setDefultCurrency)
    
}