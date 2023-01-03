const getURLLinkParam = (param) =>{
	const url = window.location.href.split('?');
	let parameterList;
	let parameter = false;

	if(url.length >= 2){
		parameterList = url[1].split('&');

		parameterList.map(function(data){
			const parameters = data.split('=');
			const parameterVar = parameters[0];
			const parameterValue = parameters[1];

			if(parameterVar === param){
				parameter = parameterValue;
			}
		})
	}

	return parameter;
};


export default getURLLinkParam;