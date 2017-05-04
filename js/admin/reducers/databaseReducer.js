export default function reducer(state={
	"database": {
		"elements": [],
	},
}, action){

	switch(action.type){
		case "GET_ELEMENTS_DONE": return getElementsDone(state, action);
	}

	return {...state}
}

function getElementsDone(state, action){
	return {...state, "database": {...state.database, "elements": action.payload.rows}}
}