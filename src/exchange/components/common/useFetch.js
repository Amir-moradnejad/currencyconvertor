import React, { useEffect, useState } from "react";

export default function UseFetch(fetchUrl , dataSource={} , method="GET"){
    let  fetchData = method=="GET" ? {} : {
        method: method,
        body: JSON.stringify(dataSource),
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      };
    let [result , setResult] = useState({
            loading:false,
            status:{isError:false , reciveError:{}},
            data:""
    });

    useEffect(()=>{
        let isMounted = true; 
        const controller = new AbortController();
        const signal = controller.signal;
        setResult({...result , loading:true});
        const callApi = async( fetchUrl ,signal ,fetchData ) =>{
            try {
                if(isMounted ){
                    const res = await fetch(fetchUrl ,fetchData ,{signal});
                    if(!res.ok){
                        throw new Error(`Error! status: ${res.status}`);
                    }
                    const data = await res.json();
                    setResult(result =>({...result , data: data}));
                }
            } 
            catch(e ){
                /*
                if (err.name === "AbortError") {
                    return "Request Aborted ";
                    }
                */                    console.log("response.statuserr" , e)

                setResult((result)=>({...result , status:{isError:true , reciveError:e}}));
            }
            finally{
                setResult(result => ({
                    ...result , 
                    loading:false

                }));

            }

        }
        callApi(fetchUrl , signal ,fetchData);
        return () => {
            isMounted = false;
            controller.abort();
         };

    } , [fetchUrl]);

    return result;
}