export default function reducer(state={
	"tags": [],
	"statusGetTags": "done",
}, action){
	
	switch(action.type){
		case "GET_TAGS_SENT": return getTagsSent(state, action);
		case "GET_TAGS_DONE": return getTagsDone(state, action);
		case "GET_TAGS_FAILED": return getTagsFailed(state, action);
	}

	return {...state}
}

function getTagsSent(state, action){
	return {...state, "statusGetTags": "sent"}
}

function getTagsDone(state, action){
	return {...state, "tags": action.payload, "statusGetTags": "done"}
}

function getTagsFailed(state, action){
	return {...state, "statusGetTags": "failed"}
}