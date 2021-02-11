import React from "react"
import { FaBriefcaseMedical } from "react-icons/fa"
const ListItem = (props) => {
	const crewMember = (props) => {
		if (props.item.dentalcrew) {
			return (
				<select
					onChange={(event) =>
						props.handleSickness(event, props.item.id)
					}
					value={props.item.not_available_due_illness}
				>
					<option value="true">Reported Sick</option>
					<option value="false">Available</option>
				</select>
			)
		}
	}

	return (
		<li
			className="lihome"
			style={
				props.item.not_available_due_illness
					? { backgroundColor: "rgba(160, 77, 77, 0.887)" }
					: null
			}
		>
			<h5>{crewMember(props)}</h5>
			<div className="sick">
				{props.item.name} {props.item.surname}
				<div>
					{!props.item.dentalcrew && !props.item.assistant ? (
						<FaBriefcaseMedical
							className="green medicicon"
							id="test"
							onClick={() => {
								props.patientAvailable(
									props.item.name,
									props.item.surname
								)
							}}
						/>
					) : null}
				</div>
			</div>
		</li>
	)
}

export default ListItem
