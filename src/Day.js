import React from "react"
import "./Day.css"
import AppointmentInDay from "./AppointmentInDay"

export default (props) => {
	const appointmentsJSX = props.appointments.map(
		({ time, patient, dentist, assistant, id }, index) => (
			<AppointmentInDay
				id={id}
				time={time}
				patient={patient}
				dentist={dentist}
				assistant={assistant}
				key={index}
				delete={props.delete}
			/>
		)
	)
	const sortedApointments = appointmentsJSX.sort((a, b) => a.props.time - b.props.time)

	return (
		<div>
			<h4>Show by day</h4>
			<select
				onChange={(event) => {
					props.selectDay(event)
				}}
			>
				<optgroup label="Show Schedule by Day">
					<option value="1">day 1</option>
					<option value="2">day 2</option>
					<option value="3">day 3</option>
					<option value="4">day 4</option>
					<option value="5">day 5</option>
					<option value="6">day 6</option>
					<option value="7">day 7</option>
					<option value="8">day 8</option>
					<option value="9">day 9</option>
					<option value="10">day 10</option>
					<option value="11">day 11</option>
					<option value="12">day 12</option>
					<option value="13">day 13</option>
					<option value="14">day 14</option>
					<option value="15">day 15</option>
					<option value="16">day 16</option>
					<option value="17">day 17</option>
					<option value="18">day 18</option>
					<option value="19">day 19</option>
					<option value="20">day 20</option>
					<option value="21">day 21</option>
					<option value="22">day 22</option>
					<option value="23">day 23</option>
					<option value="24">day 24</option>
					<option value="25">day 25</option>
					<option value="26">day 26</option>
					<option value="27">day 27</option>
					<option value="28">day 28</option>
				</optgroup>
			</select>
			<ul className="dayview">{sortedApointments}</ul>
		</div>
	)
}
