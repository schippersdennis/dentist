import React from "react"
import { BsTrash } from "react-icons/bs"

const format_time = (time) => (time < 10 ? `0${time}:00u` : `${time}:00u`)

export default (props) => (
	<li
		className="appointmentday"
		style={
			props.dentist.available
				? { backgroundColor: "rgba(160, 77, 77, 0.487)" }
				: null
		}
	>
		<div
			style={
				props.dentist.available
					? { backgroundColor: "rgba(160, 77, 77, 0.987)" }
					: null
			}
			className="time"
		>
			{format_time(props.time)}
		</div>
		<div
			style={
				props.dentist.available
					? { backgroundColor: "rgba(160, 77, 77, 0.887)" }
					: null
			}
			className="patient"
		>
			{" "}
			<BsTrash
				onClick={() => {
					props.delete(props.id, "day")
				}}
				className="trash-icon"
				style={{ paddingRight: "10px", fontSize: "30px" }}
			/>
			Patiënt: {props.patient}
		</div>
		<div className="dentist">
			Tandarts:{" "}
			{!props.dentist.available ? (
				<h3>{props.dentist.name}</h3>
			) : (
				<h2>
					reschedule an appointment due to illness. Appointment has
					been canceled
				</h2>
			)}{" "}
		</div>

		<div className="assistant">
			Assistent:{" "}
			{!props.dentist.available ? (
				<h3>{props.assistant.name}</h3>
			) : (
				<h4>
					Call to schedule a new appointment with the assistant on
					number :0800- 9999 1234
				</h4>
			)}{" "}
		</div>
	</li>
)
