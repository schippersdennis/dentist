import React, { useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { patients, dentists, assistants, appointments } from "./stateData"

import Home from "./Home"
import Calendar from "./Calendar"
import Day from "./Day"

const App = () => {
	const [dentalPractice, setDentalPractice] = useState({
		patients: patients,
		dentists: dentists,
		assistants: assistants,
		appointments: appointments,
	})

	const onSubmitHandler = (event) => {
		event.preventDefault()
		const [name, surname, email, phone] = event.target
		const newDentist = [
			{
				id: dentalPractice.dentists.length + 1,
				name: name.value,
				surname: surname.value,
				email: email.value,
				phone: phone.value,
			},
		]
		const dentistState = [...dentalPractice.dentists, ...newDentist]
		setDentalPractice((prevState) => {
			return { ...prevState, dentists: dentistState }
		})
	}
	console.log(dentalPractice)
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/calendar">
								Calendar view
							</Link>
						</li>
						<li>
							<Link to="/day">
								Day view
							</Link>
						</li>
					</ul>
				</nav>
				<main>
					<Switch>
						<Route path="/calendar">
							<Calendar
								appointments={
									dentalPractice.appointments
								}
							/>
						</Route>
						<Route path="/day">
							<Day
								appointments={dentalPractice.appointments.filter(
									(app) =>
										app.day ===
										1
								)}
							/>
						</Route>
						<Route path="/">
							<Home
								onSubmit={
									onSubmitHandler
								}
							/>
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	)
}
export default App
