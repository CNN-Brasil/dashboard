export const getGraphic = (dispatch, ecomm, token) => {
  let _url = `https://${ecomm.domain}/api/admin/intelligence/graphics`;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(_url, requestOptions).then(async response => {
    let resp = await response.json();
    dispatch({
      type: "GET_GRAPHIC",
      payload: resp
    });
  });
};