export function increment(value){
	return{
		type: "INC",
		payload: value
	}
}

export function decrement(value){
	return{
		type: "DEC",
		payload: value
	}
}