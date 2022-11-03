import React , {useState , useEffect} from "react";
import Axios from 'axios';
import Ipapi from "../components/common/detect-currency";
import { handleError } from "../components/utility";

export default function Change(){
    const [currencyOptions, setCurrencyOptions] = useState({})
    const [tocurrencyOptions, setToCurrencyOptions] = useState({})
    const [fromCurrency, setFromCurrency] = useState("usd")
    const [toCurrency, setToCurrency] = useState("inr")
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let defaultCurrency = Ipapi()
    useEffect(()=>{
      defaultCurrency && setToCurrency(defaultCurrency)
    } , [defaultCurrency])

    useEffect( ()=> {
     
    } , [fromCurrency])

    useEffect(() => {
      
        Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`)
       .then((res) => {
        console.log( "ress " , res )
        setCurrencyOptions(res.data[fromCurrency]);
        }).catch(error => handleError(error))
      }, [fromCurrency]);

  let  handleFromAmountChange = (e) =>{
    setAmount(e.target.value)
  }



  let onChangeFromCurrency= (e) => setFromCurrency(e.target.value);
  let onChangeToCurrency= (e) => setToCurrency(e.target.value)
  let flip = ()=>{
    var temp= fromCurrency;
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    
  }
  let exchangeRate = currencyOptions[toCurrency];

  let result = (amount *  exchangeRate).toFixed(2)

    return(
        <>
        <div className="input__wrapper">
          <label>Amount</label>
          <input type="number" className="input" value={amount} onChange={handleFromAmountChange} />
        </div>
        <div className="input__wrapper">
          <label>From</label>
          <select className="select" value={fromCurrency} onChange={onChangeFromCurrency}>
            {Object.keys(currencyOptions).map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
        </select>
        </div >
          <svg className="switch"  onClick={() => { flip()}} stroke="currentColor" fill="currentColor" stroke-width="0" 
            viewBox="0 0 20 20" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z">
              </path>
          </svg>
          <div className="input__wrapper">
            <label>To</label>
            <select  className="select" value={toCurrency} onChange={onChangeToCurrency }>
            {Object.keys(currencyOptions).map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          </div>



            <div className="equals" >=</div>
            <div className="result">{result ||  "..."}</div>
        </>
    )
}