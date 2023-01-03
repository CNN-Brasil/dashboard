export const getDashboard = (dispatch, ecomm, token, filter) => {
    let _url = `https://${ecomm.domain}/api/admin/intelligence/cards?last=${filter.last}&listType=${filter.listType}`;


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    console.log('token ', token)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();

        dispatch({
            type: "GET_DASHBOARD",
            payload: resp
        })
    })
}

export const getGraphic = (dispatch, ecomm, token) => {
    let _url = `https://${ecomm.domain}/api/admin/intelligence/graphics`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();

        dispatch({
            type: "GET_GRAPHIC",
            payload: resp
        })
    })
}

export const getEcomm = (dispatch, ecomm, token) => {
    let _url = `https://${ecomm.domain}/api/admin/ecommerces`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();
        dispatch({
            type: "GET_ECOMM",
            payload: resp.ecommerces
        })
    })
}

export const getReviews = (type, dispatch, filter, ecomm, token, lastEvaluatedKey, nextPage = 0) => {

    let _url = `https://${ecomm.domain}/api/admin/${type}?&status=${filter.status}&order=${filter.order}&listType=${filter.listType}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    if (nextPage !== 0 && lastEvaluatedKey) {
        _url += `&lastEvaluatedKey=${lastEvaluatedKey}`
    }

    if (filter.tag) {
        _url += `&tag=${filter.tag}`
    }

    if (filter.url) {
        _url += `&url=${filter.url}`
    }

    setIsLoad(dispatch, false);

    fetch(_url, requestOptions).then(async (response) => {
        let resp = await response.json();
        resp.nextPage = nextPage;

        setIsLoad(dispatch, true);

        dispatch({
            type: "SET_REVIEWS",
            payload: resp
        })
    })
}

export const clearReviews = (dispatch) => {
    dispatch({
        type: "SET_REVIEWS",
        payload: {
            lastEvaluatedKey: null,
            keys: [],
            items: [],
            page: 0,
        }
    })
}

export const getUsers = (dispatch, filter, ecomm, token, lastEvaluatedKey, nextPage = 0) => {

    let _url = `https://${ecomm.domain}/api/admin/users?&order=${filter.orderUsers}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    if (nextPage !== 0 && lastEvaluatedKey) {
        _url += `&lastEvaluatedKey=${lastEvaluatedKey}`
    }

    setIsLoad(dispatch, false);

    fetch(_url, requestOptions).then(async (response) => {
        let _resp = await response.json();
        setIsLoad(dispatch, true)
        _resp.nextPage = nextPage;

        dispatch({
            type: 'SET_USERS',
            payload: _resp
        })
    })

}

export const getFeaturedProducts = (dispatch, filter, ecomm, token, lastEvaluatedKey, nextPage = 0) => {
    let _url = `https://${ecomm.domain}/api/admin/intelligence/featured-products?order=${filter.orderFeaturedProducts}&sort=${filter.sortFeaturedProducts}&listType=${filter.listType}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    if (nextPage !== 0 && lastEvaluatedKey) {
        _url += `&lastEvaluatedKey=${lastEvaluatedKey}`
    }

    fetch(_url, requestOptions).then(async (response) => {
        let _resp = await response.json();
        _resp.nextPage = nextPage;

        dispatch({
            type: 'SET_FEATURED_PRODUCTS',
            payload: _resp
        })
    })

}

export const changeReview = (type, dispatch, items, status, content, selectedStatus, token, ecomm, listtype) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const _changedContent = {
        "pk": items
    }

    _changedContent[status] = content;
    _changedContent.selectedStatus = selectedStatus;
    _changedContent.listType = listtype;

    const raw = JSON.stringify(_changedContent);

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`https://${ecomm.domain}/api/admin/${type}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            dispatch({
                type: 'SET_STATUS',
                payload: result
            })
        })
        .catch(error => console.log('error', error));
}

export const setFilter = (dispatch, filter) => {
    console.log('setFilter ', filter);
    clearChecked(dispatch);
    dispatch({
        type: 'SET_FILTERS',
        payload: filter
    })
}

export const setChecked = (dispatch, id, name, checked) => {
    const _obj = {
        'id': id,
        'author': name
    }

    dispatch({
        type: 'SET_SELECTEDS',
        payload: {
            obj: _obj,
            checked: checked
        }
    })
}

export const clearChecked = (dispatch) => {

    dispatch({
        type: 'CLEAR_SELECTEDS',
        payload: 'fodasse'
    })
}

export const setNotification = (dispatch, notification) => {
    dispatch({
        type: 'SET_NOTIFICATION',
        payload: notification
    })
}

export const setRoute = (dispatch, route) => {
    dispatch({
        type: 'SET_ROUTE',
        payload: route
    })
}

export const setAnswerForm = (dispatch, items, token, ecomm, type) => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const _changedContent = items;
    
    const raw = JSON.stringify(_changedContent);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let _url;

    if(type === 'questions') {
        _url = `https://${ecomm.domain}/api/admin/answers`
    } else {
        _url = `https://${ecomm.domain}/api/admin/comments`
    }

    fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            setSuccess(dispatch, true)

            dispatch({
                type: 'SET_ANSWER',
                payload: result
            })

            let _role;

            if(type === 'reviews') {
                _role = 'REVIEWS'
            } else {
                _role = 'ANSWER'
            }
    
            setNotification(dispatch, {status: true, role: _role});
            setTimeout(() => {
                setNotification(dispatch, {
                    'status': false,
                    'role': _role
                })
                
            }, 3000)
        })
        .catch(error => console.log('error ', error));
}

export const setLogin = (dispatch, obj, ecomm) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let _obj = obj

    var raw = JSON.stringify(_obj);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`https://${ecomm.domain}/api/admin/login`, requestOptions)
        .then(response => response.json())
        .then(result => {
            localStorage.setItem('vurdere_session', JSON.stringify(result))
            localStorage.setItem('vurdere_ecomm', JSON.stringify(ecomm))

            dispatch({
                type: 'SET_USERID',
                payload: result
            })
        })
        .catch(error => {
            setError(dispatch, {email: false, pin: true})
        });
}

export const setPin = (dispatch, email) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let _email = {
        'email': email
    }

    var raw = JSON.stringify(_email);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`https://imaginarium-br.mais.social/api/admin/sendpin`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const resp = {..._email, ...result};

            dispatch({
                type: 'SET_PIN',
                payload: resp
            })
        })
        .catch(error => {
            setError(dispatch, {email: true, pin: false, nouser: true})
        });
}

export const setModal = (dispatch, value) => {
    dispatch({
        type: 'SET_MODAL',
        payload: value
    })
}

export const setSuccess = (dispatch, value) => {
    dispatch({
        type: 'SET_SUCCESS',
        payload: value
    })
}

export const setAttachment = (dispatch, value) => {
    dispatch({
        type: 'SET_ATTACH',
        payload: value
    })
}

export const setIsLoad = (dispatch, value) => {
    dispatch({
        type: 'SET_ISLOAD',
        payload: value
    })
}

export const setError = (dispatch, value) => {
    dispatch({
        type: 'SET_ERROR',
        payload: value
    })
}

export const setOrderInsightsItem = (dispatch, value) => {
    dispatch({
        type: 'SET_ORDERINSIGHTSITEM',
        payload: value
    })
}

export const setOrderInsightsId = (dispatch, value) => {
    dispatch({
        type: 'SET_ORDERINSIGHTSID',
        payload: value
    })
}

export const setUser = (dispatch, data) => {
    localStorage.setItem('vurdere_session', JSON.stringify(data))

    dispatch({
        type: 'SET_USERID',
        payload: data
    })
}

export const setCachePin = (dispatch, data, user = false) => {
    const _result = {
        ecommerce:data
    }

    localStorage.setItem('vurdere_ecomm', JSON.stringify(_result.ecommerce))

    dispatch({
        type: 'SET_PIN',
        payload: _result
    })

    if(user)
        setNewEcom(dispatch, _result.ecommerce, user)
}


export const setNewEcom = (dispatch, ecomm, user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    let newEcom = {
        "newEcommerce": ecomm.id
    }

    const raw = JSON.stringify(newEcom);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`https://${ecomm.domain}/api/admin/change-ecommerce`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const _newUser = {...user, token:result.token}

            setUser(dispatch, _newUser);
            setCustomer(dispatch, {...result.ecommerce})
            
        })
        .catch(error => {
            setError(dispatch, {email: true, pin: false, nouser: true})
        });
}

export const setExportData = (dispatch, value) => {
    dispatch({
        type: 'GET_EXPORTDATA',
        payload: value
    })
}

export const setFirstAccess = (dispatch, value) => {
    dispatch({
        type: 'SET_FIRSTACCESS',
        payload: value
    })
}

export const setMoreCards = (dispatch, value) => {
    dispatch({
        type: 'SET_MORECARDS',
        payload: value
    })
}

export const setCustomer = (dispatch, value) => {
    dispatch({
        type: 'SET_CUSTOMER',
        payload: value
    })
}

export const setActualArea = (dispatch, value) => {
    dispatch({
        type: 'SET_ACTUALAREA',
        payload: value
    })
}


