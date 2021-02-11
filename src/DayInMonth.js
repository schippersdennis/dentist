import React from "react"
import AppointmentInMonth from "./AppointmentInMonth"

export default (props) => {
	const appointmentsJSX = props.appointments.map(
		({ time, assistant, patient, dentist, id, day }, index) => (
			<AppointmentInMonth
				edit={props.edit}
				time={time}
				day={day}
				assistant={assistant}
				patient={patient}
				dentist={dentist}
				id={id}
				key={index}
				delete={props.delete}
			/>
		)
	)
	return <div className="day">{appointmentsJSX}</div>
}
