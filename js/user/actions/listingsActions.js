import _ from 'lodash';

export function getListings(filters={}, number=8, page=1){
	return function(dispatch){
		dispatch({
			type: "GET_LISTINGS_SENT",
		});

		setTimeout(function(){
			const data = {
				"pages": Math.floor((Math.random() * 8) + 1),
				"listings": _.map(_.range(number), function(number){
					return {
						"id": number,
						"title": "Title for movie: " + number,
						"description": "Description for movie ".repeat(100),
						"poster": "/public/image.jpg"
					}
				})
			}

			dispatch({
				type: "GET_LISTINGS_DONE",
				payload: data
			});

			/*
			dispatch({
				type: "GET_LISTINGS_FAILED"
			});
			*/
		}, 0);
	}
}