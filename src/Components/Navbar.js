import React from 'react'

export default function Navbar(props) {
	return (
		<div className  = 'row'>
			<div className = 'col-md-6'>
				<h1 className='title'>Weather App</h1>
			</div>
			<div className = 'col-md-6'>
				<form className = 'region' onSubmit = {(e)=>props.changeWeather(e)}>
					<input className = 'regioninput' placeholder = 'Enter your location' onChange = {(e)=>
						props.changeRegion(e.target.value)}></input>
				</form>
			</div>
		</div>
	)
}