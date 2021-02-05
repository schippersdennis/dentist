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
	return `${person.name} ${person.surname}`
}

const getRandomPatient = (patients) => {
	const person = patients[Math.floor(Math.random() * 50)]
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
	return Array(150)
		.fill(0)
		.map((_) => createAppointment(patients, dentists, assistants))
}
