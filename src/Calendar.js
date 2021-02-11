import React from "react"
import "./Calendar.css"
import DayInMonth from "./DayInMonth"
import { useState } from "react"

const divideByDay = (appointments) => {
	const appointmentsByDay = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: [],
		7: [],
		8: [],
		9: [],
		10: [],
		11: [],
		12: [],
		13: [],
		14: [],
		15: [],
		16: [],
		17: [],
		18: [],
		19: [],
		20: [],
		21: [],
		22: [],
		23: [],
		24: [],
		25: [],
		26: [],
		27: [],
		28: [],
	}
	appointments.forEach((appointment) => {
		const day = appointment.day

		if (!appointmentsByDay.hasOwnProperty(day)) {
			appointmentsByDay[day] = []
		}
		appointmentsByDay[day].push(appointment)

		appointmentsByDay[day].sort((a, b) => a.time - b.time)
	})

	return appointmentsByDay
}

export default (props) => {
	const [reSchedule, setReschedule] = useState({ id: null, hour: null, day: null })

	const editAppointment = (info) => {
		const { time, day, id } = info
		const appointmentOnClick = { ...reSchedule, id: id, hour: time, day: day }
		setReschedule(appointmentOnClick)
	}

	const appointmentsByDay = divideByDay(props.appointments)

	const daysInMonthJSX = Object.values(appointmentsByDay).map((appointmentsInDay, index) => (
		<DayInMonth
			edit={editAppointment}
			appointments={appointmentsInDay}
			key={index}
			delete={props.delete}
		/>
	))

	daysInMonthJSX.map((day) => {
		return <div className={day.key + 1}>{day}</div>
	})

	const [
		day1,
		day2,
		day3,
		day4,
		day5,
		day6,
		day7,
		day8,
		day9,
		day10,
		day11,
		day12,
		day13,
		day14,
		day15,
		day16,
		day17,
		day18,
		day19,
		day20,
		day21,
		day22,
		day23,
		day24,
		day25,
		day26,
		day27,
		day28,
	] = daysInMonthJSX

	return (
		<div className="calendarview">
			<div className="editAppointment">
				<h2>Reschedule</h2>
				<form
					onSubmit={(event) => {
						props.rescheduleHandler(event, reSchedule)
					}}
					className="editForm"
				>
					<label>
						<h3>appointment id</h3>
						<input
							disabled
							type="number"
							defaultValue={reSchedule.id}
							placeholder="id"
						></input>
					</label>
					<label>
						<h3>new time</h3>
						<input
							type="number"
							placeholder="hour"
							defaultValue={reSchedule.hour}
							min={7}
							max={19}
						></input>
					</label>
					<label>
						<h3>new day</h3>
						<input
							type="number"
							defaultValue={reSchedule.day}
							placeholder="day"
							min={1}
							max={28}
						></input>
					</label>
					<label>
						<h3>re-schedule</h3>
						<button>submit new appointment</button>
					</label>
				</form>
				<h3>reschedule an appointment by clicking on the appointment</h3>
			</div>
			<div className="header">
				<div>Maandag</div>
				<div>Dinsdag</div>
				<div>Woensdag</div>
				<div>Donderdag</div>
				<div>Vrijdag</div>
			</div>
			<div className="table">
				<div className="day1">
					<h4>day1</h4>
					{day1}
				</div>
				<div className="day2">
					<h4>day2</h4>
					{day2}
				</div>
				<div className="day3">
					<h4>day3</h4>
					{day3}
				</div>
				<div className="day4">
					<h4>day4</h4>
					{day4}
				</div>
				<div className="day5">
					<h4>day5</h4>
					{day5}
				</div>
				<div className="day6">
					<h4>day6</h4>
					{day6}
				</div>
				<div className="day7">
					<h4>day7</h4>
					{day7}
				</div>
				<div className="day8">
					<h4>day8</h4>
					{day8}
				</div>
				<div className="day9">
					<h4>day9</h4>
					{day9}
				</div>
				<div className="day10">
					<h4>day10</h4>
					{day10}
				</div>
				<div className="day11">
					<h4>day11</h4>
					{day11}
				</div>
				<div className="day12">
					<h4>day12</h4>
					{day12}
				</div>
				<div className="day13">
					<h4>day13</h4>
					{day13}
				</div>
				<div className="day14">
					<h4>day14</h4>
					{day14}
				</div>
				<div className="day15">
					<h4>day15</h4>
					{day15}
				</div>
				<div className="day16">
					<h4>day16</h4>
					{day16}
				</div>
				<div className="day17">
					<h4>day17</h4>
					{day17}
				</div>
				<div className="day18">
					<h4>day18</h4>
					{day18}
				</div>
				<div className="day19">
					<h4>day19</h4>
					{day19}
				</div>
				<div className="day20">
					<h4>day20</h4>
					{day20}
				</div>
				<div className="day21">
					<h4>day21</h4>
					{day21}
				</div>
				<div className="day22">
					<h4>day22</h4>
					{day22}
				</div>
				<div className="day23">
					<h4>day23</h4>
					{day23}
				</div>
				<div className="day24">
					<h4>day24</h4>
					{day24}
				</div>
				<div className="day25">
					<h4>day25</h4>
					{day25}
				</div>
				<div className="day26">
					<h4>day26</h4>
					{day26}
				</div>
				<div className="day27">
					<h4>day27</h4>
					{day27}
				</div>
				<div className="day28">
					<h4>day28</h4>
					{day28}
				</div>
			</div>
		</div>
	)
}
