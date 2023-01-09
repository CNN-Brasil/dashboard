export const getIbope = (dispatch) => {
    let _url = 'http://localhost:9999/view/ibope';

    var requestOptions = {
        method: 'GET',
        mode:"cors"
    };

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();

        dispatch({
            type: "GET_IBOPE",
            payload: resp
        })
    })
}

export const getYoutube = (dispatch) => {
    let _url = 'http://localhost:9999/view/youtube';

    var requestOptions = {
        method: 'GET',
        mode:"cors"
    };

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();

        dispatch({
            type: "GET_YOUTUBE",
            payload: resp
        })
    })
}

export const getTotal = (dispatch) => {
    let _url = 'http://localhost:9999/view/consolidated';

    var requestOptions = {
        method: 'GET',
        mode:"cors"
    };

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();

        dispatch({
            type: "GET_TOTAL",
            payload: resp
        })
    })
}

