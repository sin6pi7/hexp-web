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

		case "GET_ELEMENTS_SENT": return getElementsSent(state, action);
		case "GET_ELEMENTS_DONE": return getElementsDone(state, action);
		case "GET_ELEMENTS_FAILED": return getElementsFailed(state, action);

		case "CHANGE_PAGE": return changePage(state, action);

	}

	return {...state}
}

function changeTable(state, action){
	return {...state, "query": {...state.query, "table": action.payload, "page": 0}}
}

function getElementsSent(state, action){
	return {...state, "statusQuery": "sent"}
}

function getElementsDone(state, action){
	return {
		...state,
		"statusQuery": "done",
		"query" : {...state.query, "results": action.payload.count}
	}
}

function getElementsFailed(state, action){
	return {...state, "statusQuery": "failed"}
}

function changePage(state, action){
	return {...state, "query": {...state.query, "page": action.payload}}
}