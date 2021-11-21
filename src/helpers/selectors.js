// const day = "Monday"

export function getAppointmentsForDay(state, day) {

  // Validation: if days data is empty
  if (state.days.length === 0) {
    return [];
  }

  const filteredByDay = state.days.filter(element => {
    return element.name === day
  });

  // Validation: if no day found 
  if (filteredByDay.length === 0) {
    return [];
  };

  const filteredDayAppointmentArray = filteredByDay[0].appointments

  // Function will convert filteredDayAppointmentArray of numbers to array of strings
  const filteredAppointmentArray = filteredDayAppointmentArray.map(element => {
    return String(element)
  });

  // Function will match appointments based on day 
  const matchedAppointmentID = [];
  const filteredAppointmentID = filteredAppointmentArray.filter(element => {
    if (filteredAppointmentArray.includes(element)) {
      matchedAppointmentID.push(element)
    }
  });

  // Function will return an array of appointment details/obj
  const appointmentArrayObj = [];
  matchedAppointmentID.forEach(element => {
    appointmentArrayObj.push(state.appointments[element])
  });

  return appointmentArrayObj
}
