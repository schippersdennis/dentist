import React, { useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { patients, dentists, assistants } from "./stateData"
import { createAppointments } from "./createAppointments"

import Home from "./Home"
import Calendar from "./Calendar"
import Day from "./Day"

const App = () => {
	const [dentalPractice, setDentalPractice] = useState({
		patients: [],
		dentists: [],
		assistants: [],
		appointments: [],
		appointments_by_day: [],
	})

	useEffect(() => {
		const addPatients = [...dentalPractice.patients, ...patients]
		const addDentists = [...dentalPractice.dentists, ...dentists]
		const addAssistants = [...dentalPractice.dentists, ...assistants]
		const addAppointments = [
			...dentalPractice.appointments,
			...createAppointments(patients, dentists, assistants),
		]
		setDentalPractice((prevState) => {
			return {
				...prevState,
				patients: addPatients,
				dentists: addDentists,
				assistants: addAssistants,
				appointments: addAppointments,
				appointments_by_day: addAppointments.filter((app) => {
					return app.day === 1
				}),
			}
		})
	}, [])

	const addDentist = (event) => {
		event.preventDefault()
		const [name, surname, email, phone] = event.target
		const newDentist = [
			{
				id: dentalPractice.dentists.length + 1,
				name: name.value,
				surname: surname.value,
				email: email.value,
				phone: phone.value,
				not_available_due_illness: false,
				dentalcrew: true,
			},
		]

		const dentistState = [...dentalPractice.dentists, ...newDentist]
		const addAppointments = createAppointments(
			dentalPractice.patients,
			dentistState,
			dentalPractice.assistants
		)

		setDentalPractice((prevState) => {
			return {
				...prevState,
				dentists: dentistState,
				appointments: addAppointments,
			}
		})
	}

	const addPatient = (event) => {
		event.preventDefault()
		const [name, surname, email, phone] = event.target
		const newPatient = [
			{
				id: dentalPractice.patients.length + 1,
				name: name.value,
				surname: surname.value,
				email: email.value,
				phone: phone.value,
			},
		]
		const patientState = [...dentalPractice.patients, ...newPatient]
		const addAppointments = createAppointments(
			patientState,
			dentalPractice.dentists,
			dentalPractice.assistants
		)
		setDentalPractice((prevState) => {
			return {
				...prevState,
				patients: patientState,
				appointments: addAppointments,
			}
		})
	}
	const handleSickness = (event, id) => {
		const report = event.target.value === "true" ? true : false
		const dentistState = [...dentalPractice.dentists]
		dentistState.map((dentist) => {
			return dentist.id === id
				? (dentist.not_available_due_illness = report)
				: null
		})
		const addAppointments = createAppointments(
			dentalPractice.patients,
			dentistState,
			dentalPractice.assistants
		)

		setDentalPractice((prevState) => {
			return {
				...prevState,
				dentists: dentistState,
				appointments: addAppointments,
			}
		})
	}
	const checkDentistAssistant = (dentistID, assistantID, day, time) => {
		const filterByDentist = dentalPractice.appointments.some((appointment) => {
			if (
				//dentist
				appointment.dentist.id === dentistID &&
				appointment.day === day &&
				appointment.time === time
			) {
				return appointment
			}
			if (
				//assistant
				appointment.assistant.id === assistantID &&
				appointment.day === day &&
				appointment.time === time
			)
				return appointment
			return false
		})
		return filterByDentist
	}

	const addApointmentSubmit = (event) => {
		event.preventDefault()
		//form values
		const [day, time, patient, dentist, assistant] = event.target

		//dentist data
		const findDentist = dentalPractice.dentists.find((person) => {
			return person.id === parseInt(dentist.value)
		})
		//assistent data
		const findAssistant = dentalPractice.assistants.find((person) => {
			return person.id === parseInt(assistant.value)
		})
		//create a new appointment
		let newAppointMent = {
			day: parseInt(day.value),
			time: parseInt(time.value),
			patient: patient.value,
			dentist: findDentist,
			assistant: findAssistant,
		}
		const filterDateTime = (newAppointMent, dentalPractice) => {
			const dentist = newAppointMent.dentist.id
			const assistant = newAppointMent.assistant.id
			const day = newAppointMent.day
			const time = newAppointMent.time

			const filterByDentist = checkDentistAssistant(dentist, assistant, day, time)

			if (!filterByDentist) {
				const appointmentsState = [...dentalPractice.appointments]
				appointmentsState.unshift(newAppointMent)
				setDentalPractice((prevState) => {
					return {
						...prevState,
						appointments: appointmentsState,
					}
				})
			} else {
				alert(
					"The dentist or assistant is not available on this day / time."
				)
			}
		}
		if (
			day.value !== "" &&
			time.value !== "" &&
			patient.value !== "Choose Patient" &&
			assistant.value !== "Choose Assistant"
		) {
			filterDateTime(newAppointMent, dentalPractice)
		} else {
			alert("fill in all the fields @ add appointment")
		}
	}

	const deleteAppointment = (id, day) => {
		if (day !== "day") {
			const appointmentsCopy = [...dentalPractice.appointments]
			const updatedAppointments = appointmentsCopy.filter((item) => {
				return item.id !== id
			})
			const appointmentDayCopy = [...dentalPractice.appointments_by_day]
			const updatedDay = appointmentDayCopy.filter((item) => {
				return item.id !== id
			})

			setDentalPractice((prevState) => {
				return {
					...prevState,
					appointments: updatedAppointments,
					appointments_by_day: updatedDay,
				}
			})
		} else {
			const appointmentDayCopy = [...dentalPractice.appointments_by_day]
			const updatedAppointmentsDay = appointmentDayCopy.filter((item) => {
				return item.id !== id
			})
			setDentalPractice((prevState) => {
				return { ...prevState, appointments_by_day: updatedAppointmentsDay }
			})
		}
	}
	const selectDay = (event) => {
		const appointmentsByDay = dentalPractice.appointments.filter(
			(app) => app.day === parseInt(event.target.value)
		)
		setDentalPractice((prevState) => {
			return { ...prevState, appointments_by_day: appointmentsByDay }
		})
	}

	const patientAvailable = (name, surname) => {
		const appointments = [...dentalPractice.appointments]
		// filter appointments
		const updatedAppointments = appointments.filter((appointment) => {
			return appointment.patient !== `${name} ${surname}`
		})
		//return newstate
		setDentalPractice((prevState) => {
			return { ...prevState, appointments: updatedAppointments }
		})
	}
	const rescheduleHandler = (event, oldValues) => {
		event.preventDefault()
		const [id, time, day] = event.target
		const appointments = [...dentalPractice.appointments]

		//filter out actual appointment
		const actualAppointment = appointments.filter((appointment) => {
			return appointment.id === parseInt(id.value)
		})
		// remove old appointment
		const updatedAppointments = appointments.filter((appointment) => {
			return appointment.id !== parseInt(id.value)
		})

		//change the appointment
		const newAppointment = actualAppointment.map((appointment) => {
			console.log(appointment)
			// check availability dentist + assistant on day and time
			const dentist = appointment.dentist.id
			const assistant = appointment.assistant.id
			//new day & time
			const newAppointmentDay = parseInt(day.value)
			const newAppointmentTime = parseInt(time.value)

			const available = checkDentistAssistant(
				dentist,
				assistant,
				newAppointmentDay,
				newAppointmentTime
			)
			if (available) {
				alert("day /time conflict, choose another day or time ")
				return appointment
			} else {
				appointment.day = newAppointmentDay
				appointment.time = newAppointmentTime
				return appointment
			}
		})
		//rescheduled new state of appointments Calendar
		const newState = [...updatedAppointments, ...newAppointment]
		// When item on dayview one rescheduled, then remove
		const appointmentsByDay = dentalPractice.appointments.filter((app) => app.day === 1)
		setDentalPractice((prevState) => {
			return {
				...prevState,
				appointments: newState,
				appointments_by_day: appointmentsByDay,
			}
		})
	}

	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/calendar">Calendar view</Link>
						</li>
						<li>
							<Link to="/day">Day view</Link>
						</li>
					</ul>
				</nav>
				<main>
					<Switch>
						<Route path="/calendar">
							<Calendar
								rescheduleHandler={
									rescheduleHandler
								}
								appointments={
									dentalPractice.appointments
								}
								delete={deleteAppointment}
							/>
						</Route>
						<Route path="/day">
							<Day
								appointments={
									dentalPractice.appointments_by_day
								}
								delete={deleteAppointment}
								selectDay={selectDay}
							/>
						</Route>
						<Route path="/">
							<Home
								dental={dentalPractice}
								addDentist={addDentist}
								addPatient={addPatient}
								handleSickness={handleSickness}
								addApointmentSubmit={
									addApointmentSubmit
								}
								patientAvailable={patientAvailable}
							/>
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	)
}
export default App
