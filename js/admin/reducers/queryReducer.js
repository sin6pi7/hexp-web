export default function reducer(state={
	"query": {
		"table": "movies",
		"limit": 25,
		"results": 0,
		"page": 0,
		"options": {}
	},

	"statusQuery": "done",
}, action){
	
	switch(action.type){

		case "CHANGE_TABLE": return changeTable(state, action);

	}

	return {...state}
}

function changeTable(state, action){
	return {...state, "query": {...state.query, "table": action.payload}}
}