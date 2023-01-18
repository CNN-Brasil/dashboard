export const getIbope = (dispatch) => {
    let _url = "https://ytib.cnnbrasil.com.br:3000/";
    _url = `${_url}/view/ibope`;
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
    let _url = "https://ytib.cnnbrasil.com.br:3000/";
    _url = `${_url}/view/youtube`;

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
    let _url = "https://ytib.cnnbrasil.com.br:3000/";
    _url = `${_url}/view/consolidated`;

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

export const getShare = (dispatch) => {
    let _url = 'http://localhost:9999/view/shareConsolidated';

    var requestOptions = {
        method: 'GET',
        mode:"cors"
    };

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();
        console.log('resp ', resp);
        dispatch({
            type: "GET_SHARE",
            payload: resp
        })
    })
}

export const setLogin = (dispatch, value) => {

    localStorage.setItem('isLogged', true)

    dispatch({
        type: "SET_LOGIN",
        payload: value
    })
}