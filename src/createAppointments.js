const getRandomDay = () => Math.floor(Math.random() * 28) + 1

const getRandomTime = () => {
	let hour
	while (true) {
		hour = Math.floor(Math.random() * 24)
		if (hour > 7 && hour < 19) {
			return hour
		}
	}
}

const addDentalCrew = (dentalCrew) => {
	const person = dentalCrew[Math.floor(Math.random() * dentalCrew.length)]

	return {
		id: person.id,
		name: `${person.name} ${person.surname}`,
		available: person.not_available_due_illness,
	}
}

const getRandomPatient = (patients) => {
	const person = patients[Math.floor(Math.random() * patients.length)]
	return `${person.name} ${person.surname}`
}

const createAppointment = (patients, dentists, assistants) => ({
	patient: getRandomPatient(patients),
	dentist: addDentalCrew(dentists),
	assistant: addDentalCrew(assistants),
	day: getRandomDay(),
	time: getRandomTime(),
})

export const createAppointments = (patients, dentists, assistants) => {
	const newAppointments = Array(150)
		.fill(0)
		.map((_) => createAppointment(patients, dentists, assistants))
	const newAppointmentsIDAdded = newAppointments.map((item, index) => {
		item.id = index + 1
		return item
	})
	return newAppointmentsIDAdded
}

// export const appointments = createAppointments(patients, dentists, assistants)
