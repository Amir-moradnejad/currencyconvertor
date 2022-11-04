import React , {useState , useEffect} from "react";
import Axios from 'axios';
import CurrencyRow from "./currency-row";
import Ipapi from "../components/common/detect-currency";
import { handleError } from "../components/utility";

export default function Exchange(){
    const [currencyOptions, setCurrencyOptions] = useState({})
    const [tocurrencyOptions, setToCurrencyOptions] = useState({})
    const [fromCurrency, setFromCurrency] = useState("usd")
    const [toCurrency, setToCurrency] = useState("inr")
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let defaultCurrency = Ipapi()
    useEffect(()=>{
        setToCurrency(defaultCurrency)
    } , [defaultCurrency])

    useEffect(() => {
        Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`)
       .then((res) => {
        console.log( "ress " , res )
        setCurrencyOptions(res.data[fromCurrency]);
        })
        .catch(error => handleError(error))
      }, [fromCurrency]);

      useEffect(() => {
          Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${toCurrency}.json`)
           .then((res) => {
            console.log( "ress " , res )
            setToCurrencyOptions(res.data[toCurrency]);
            }).catch(error => handleError(error))
        
      }, [toCurrency]);
      let toAmount, fromAmount  , exchangeRate
      if (amountInFromCurrency) {
        console.log("currencyOptions" , tocurrencyOptions) 
         exchangeRate = currencyOptions[toCurrency];
        fromAmount = amount
        toAmount = amount * exchangeRate;
        toAmount = toAmount.toFixed(2)
      } else {
        toAmount = amount
        exchangeRate = tocurrencyOptions[fromCurrency];
        fromAmount = amount * exchangeRate
        fromAmount = fromAmount.toFixed(2)
      }

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  let flip = ()=>{
    var temp= fromCurrency;
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    
  }
    return(
        <>
            <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
            />
            <svg className="switch"  onClick={() => { flip()}} stroke="currentColor" fill="currentColor" stroke-width="0" 
              viewBox="0 0 20 20" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z">
              </path>
            </svg>
            <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
            />
        </>
    )
}