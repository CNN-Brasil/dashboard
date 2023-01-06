export const getIbope = (dispatch) => {
    let _url = 'http://localhost:9999/view/ibope';

    var requestOptions = {
        method: 'GET',
        mode:"cors"
    };

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();
        console.log('resp ', resp)
        dispatch({
            type: "GET_IBOPE",
            payload: resp
        })
    })
}

