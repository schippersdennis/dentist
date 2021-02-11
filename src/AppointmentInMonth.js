import React from "react"
import { BsTrash } from "react-icons/bs"

const format_time = (time) => (time < 10 ? `0${time}:00u` : `${time}:00u`)

const AppointmentInMonth = (props) => {
	return (
		<div
			onClick={() => {
				props.edit(props)
			}}
			className="appointment"
			style={
				props.dentist.available
					? { backgroundColor: "rgba(160, 77, 77, 0.887)" }
					: null
			}
		>
			<div>
				<span className="time">{format_time(props.time)}</span>
				<span className="patient">{props.patient}</span>
			</div>
			<BsTrash
				onClick={() => {
					props.delete(props.id)
				}}
				className="trash-icon"
			/>
		</div>
	)
}

export default AppointmentInMonth
