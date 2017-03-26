import React from 'react';

export default class Pagination extends React.Component{
	render(){
		return (	
  			<ul className="pagination">
			    <li>
			    	<a>
			    		<span>&laquo;</span>
			    	</a>
			    </li>
			    <li><a>1</a></li>
			    <li><a>2</a></li>
			    <li><a>3</a></li>
			    <li><span>...</span></li>
			    <li><a>56</a></li>
			    <li>
			    	<a>
			    		<span>&raquo;</span>
			    	</a>
			    </li>
		  	</ul>
		);
	}
}