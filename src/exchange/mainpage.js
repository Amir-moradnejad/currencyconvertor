import React from "react";
import { Link } from "react-router-dom";

export default function MainPage(){
    return(
    <>
        <h3> Choose on of method: </h3>
        <Link title="method1" className="link" to ={"method1"}>
            method1
        </Link>
        <Link title="method2" className="link" to ={"method2"}>
            method2
        </Link>
    </>
    )
}