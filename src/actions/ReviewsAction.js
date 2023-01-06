export const getIbope = (dispatch) => {
    let _url = 'http://localhost:9999/view/ibope';

    var requestOptions = {
        method: 'GET',
        mode:"no-cors"
    };

    fetch(_url, requestOptions).then((response) => {
        console.log('response ', response)
        response.text().then((data) => {
            console.log('data ', data)
            
            let resp = data;
        
            dispatch({
                type: "GET_IBOPE",
                payload: resp
            })
        })
    })
}

