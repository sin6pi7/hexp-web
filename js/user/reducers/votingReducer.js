export default function reducer(state={	
	"statusVote": "sent/done/failed",
}, action){

	switch(action.type){

		case "VOTE_SENT": return voteSent(state, action);
		case "VOTE_DONE": return voteDone(state, action);
		case "VOTE_FAILED": return voteFailed(state, action);

	}

	return {...state}

}

function voteSent(state, action){
	return {...state, "statusVote": "sent"}
}

function voteDone(state, action){
	return {...state, "statusVote": "done"}
}

function voteFailed(state, action){
	return {...state, "statusVote": "failed"}
}