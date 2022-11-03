function loading(){
    return(
        <>
            <div className="loading">
                <p>loading..</p>
            </div>
        </>
    )
}

function handleError(errro){
    return <div> Sorry! try again. {errro}</div>
}

export { loading , handleError}

