export default function reducer(state={
	my_number: 1
}, action){

	switch(action.type){
		case "INC": return inc(state, action)
		case "DEC": return dec(state, action)
	}

	return {...state}

}

function inc(state, action){
	return {...state, my_number: state.my_number + action.payload}
}

function dec(state, action){
	return {...state, my_number: state.my_number - action.payload}
}