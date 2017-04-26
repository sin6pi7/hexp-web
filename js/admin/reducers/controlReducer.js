export default function reducer(state=>{
	"selectedTab": "movies",
}, action){

	switch(action.type){
		case "SET_SELEECT_TAB": return setSelectedTab(state, action);
	}

	return {...state}

}

function setSelectedTab(state, action){
	return {...state, "selectedTab": action.payload}
}