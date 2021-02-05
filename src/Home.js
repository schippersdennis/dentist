import React from "react"
import "./App.css"

const Home = (props) => {
	return (
		<div className="container">
			<div className="addDentist">
				<form
					onSubmit={(event) => {
						props.onSubmit(event)
					}}
				>
					<input
						type="text"
						placeholder="enter name"
					/>
					<input
						type="text"
						placeholder="enter surname"
					/>
					<input
						type="text"
						placeholder="enter email"
					/>
					<input
						type="number"
						placeholder="enter phonenumber"
					/>

					<button>add dentist</button>
				</form>
			</div>
		</div>
	)
}

export default Home
