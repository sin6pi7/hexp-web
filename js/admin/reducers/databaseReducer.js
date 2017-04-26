export default function reducer(state={
	"schema": {},
	"statusGetDatabaseSchema": "done",
}, action){

	switch(action.type){
		case "GET_DATABASE_SCHEMA_SENT": return getDatabaseSchemaSent(state, action);
		case "GET_DATABASE_SCHEMA_DONE": return getDatabaseSchemaDone(state, action);
		case "GET_DATABASE_SCHEMA_FAILED": return getDatabaseSchemaFailed(state, action);
	}

	return {...state}

}

function getDatabaseSchemaSent(state, action){
	return {...state, "statusGetDatabaseSchema": "sent"}
}

function getDatabaseSchemaDone(state, action){
	return {...state, "schema": action.payload, "statusGetDatabaseSchema": "done"}
}

function getDatabaseSchemaFailed(state, action){
	return {...state, "statusGetDatabaseSchema": "failed"}
}