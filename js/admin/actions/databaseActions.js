/**
 * Get the database schema
 *
 * GET_DATABASE_SCHEMA_SENT
 * GET_DATABASE_SCHEMA_DONE
 * GET_DATABASE_SCHEMA_FAILED
 */
export function getDatabaseSchema(){
	return function(dispatch){
		dispatch({
			"type": "GET_DATABASE_SCHEMA_SENT",
		});

		setTimeout(function(){
			dispatch({
				"type": "GET_DATABASE_SCHEMA_DONE",
				"payload": {
					"movies": {
						"id": "integer",
						"name": "string",
						"description": "string",
						"tags": "array",
						"periods": "array",
						"regions": "array",
						"release_date": "integer",
					},
					"periods": {
						"name": "string",
					},
					"regions": {
						"code": "string",
						"name": "string",
					},
					"tags": {
						"id": "integer",
						"name": "string",
					},
					"feedback": {
						"id": "integer",
						"movie": "integer",
						"asset": "string",
						"vote": "string",
						"extra": "string",
					},
				}
			});
		}, 0);
	}
}