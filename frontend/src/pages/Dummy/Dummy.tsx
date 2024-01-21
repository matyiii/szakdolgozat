import React from 'react'

export const Dummy = () => {
	
	async function testApi() {
		const response = await fetch("http://127.0.0.1:8000/api/dummy/test");
		const movies = await response.json();
		console.log(movies);
	}

  return (
	<div>
		<h1>Dummy</h1>
		<button onClick={ testApi }>Test</button>
	</div>
  )
}

export default Dummy;