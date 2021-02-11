import React from "react"
import ListItem from "./ListItem"
import { FaBriefcaseMedical } from "react-icons/fa"
import "./App.css"

const Home = (props) => {
	const patientsOverview = props.dental.patients.map((patient) => {
		return (
			<ListItem
				key={patient.id}
				item={patient}
				patientAvailable={props.patientAvailable}
			/>
		)
	})
	const dentistsOverview = props.dental.dentists.map((patient) => {
		return (
			<ListItem
				key={patient.id}
				item={patient}
				handleSickness={props.handleSickness}
			/>
		)
	})
	const assistantsOverview = props.dental.assistants.map((patient) => {
		return <ListItem key={patient.id} item={patient} />
	})

	//add apointments with selectboxes
	const dentalPick = (persons) => {
		return persons.map((person) => {
			return (
				<option key={person.id} value={person.id}>
					{person.name} {person.surname}
				</option>
			)
		})
	}
	const patientPick = (persons) => {
		return persons.map((person) => {
			return (
				<option key={person.id} value={`${person.name} ${person.surname}`}>
					{person.name} {person.surname}
				</option>
			)
		})
	}

	const dentistsNewAppointment = dentalPick(props.dental.dentists)
	const patientNewAppointment = patientPick(props.dental.patients)
	const assistentNewAppointment = dentalPick(props.dental.assistants)

	return (
		<div className="container">
			<div className="inputOverview">
				<h2>Input Overview</h2>
				<div className="addDentist">
					<form
						onSubmit={(event) => {
							props.addDentist(event)
						}}
					>
						<h4>Add a new dentist</h4>
						<input type="text" placeholder="enter name" />
						<input type="text" placeholder="enter surname" />
						<input type="text" placeholder="enter email" />
						<input type="number" placeholder="enter phone" />

						<button>add dentist</button>
					</form>
				</div>
				<div className="addPatient">
					<form
						onSubmit={(event) => {
							props.addPatient(event)
						}}
					>
						<h4>Add a new patient</h4>
						<input type="text" placeholder="enter name" />
						<input type="text" placeholder="enter surname" />
						<input type="text" placeholder="enter email" />
						<input type="number" placeholder="enter phone" />

						<button>add patient</button>
					</form>
				</div>

				<form
					onSubmit={(event) => {
						props.addApointmentSubmit(event)
					}}
					className="addApointment"
				>
					<h4>Add a new appointment</h4>
					<input type="number" placeholder="day" min={1} max={28} />

					<input type="number" placeholder=" time" min={7} max={19} />
					<select>
						<option>Choose Patient</option>
						<optgroup label="patients">
							{patientNewAppointment}
						</optgroup>
					</select>

					<select>
						<option>Choose Dentist</option>
						<optgroup label="dentists">
							{dentistsNewAppointment}
						</optgroup>
					</select>

					<select>
						<option>Choose Assistant</option>
						<optgroup label="without assistant">
							<option value="3">Without Assistant</option>
						</optgroup>
						<optgroup label="assistents">
							{assistentNewAppointment}
						</optgroup>
					</select>
					<button>add appointment</button>
				</form>
			</div>
			{/* PatientsOverview */}
			<div className="dentalOverview">
				<h2>Patients Overview</h2>
				<div className="iconhome">
					<FaBriefcaseMedical className="mediciconhome" />
					<span>
						patient is ill, delete appointments. total deleted:{" "}
						<span style={{ color: "rgb(160, 77, 77, 1)" }}>
							{150 - props.dental.appointments.length}{" "}
						</span>
						of 150
					</span>
				</div>

				<ol>{patientsOverview}</ol>
			</div>
			{/* DentistsOverview */}
			<div className="dentalOverview">
				<h2>Dentists Overview</h2>
				<ol>{dentistsOverview}</ol>
			</div>
			{/* AssistantsOverview */}
			<div className="dentalOverview">
				<h2>Assistants Overview</h2>
				<ol>{assistantsOverview}</ol>
			</div>
			{/* AppointmentCounter */}
			<div className="dentalOverview">
				<h2>Appointments Counter</h2>
				<h3>{props.dental.appointments.length}</h3>
			</div>
		</div>
	)
}

export default Home
