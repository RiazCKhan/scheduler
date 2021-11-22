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

  const filteredByDayAppointmentArray = filteredByDay[0].appointments

  // Function will convert filteredByDayAppointmentArray of numbers to array of strings
  const filteredAppointmentArray = filteredByDayAppointmentArray.map(element => {
    return String(element)
  });

  // Function will return an array of appointment details/obj
  const appointmentArrayObj = [];
  filteredAppointmentArray.forEach(element => {
    appointmentArrayObj.push(state.appointments[element])
  });
  // console.log(appointmentArrayObj)
  return appointmentArrayObj
}

export function getInterviewersForDay(state, day) {
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

  const filteredByDayInterviewerArray = filteredByDay[0].interviewers

  // Function will take interviewers arr from state.days and convert arr to strings to match state.interviewers key
  const filteredInterviewerArray = filteredByDayInterviewerArray.map(element => {
    return String(element)
  });

  // Function will use array of interviwer keys to identify interviewer and push to arr
  const interviewerArray = [];
  filteredInterviewerArray.forEach(element => {
    interviewerArray.push(state.interviewers[element])
  });

  return interviewerArray
}

export function getInterview(state, interview) {
  // console.log('ze state', state.appointments)
  // console.log('ze interview', interview)

  // console.log(interview)
  if (!interview) {
    return null;
  }

  const interviewObj = {};

  // Function will convert interviewerID strings to numbers
  const interviewerIDArray = Object.keys(state.interviewers).map(element => {
    return Number(element)
  });
  //console.log('arr of all interviewer ids', interviewerIDArray)

  const matchInterviewerWithStudent = interviewerIDArray.filter(element => {
    // console.log('each Interviewer ID from mock data', element)
    // console.log('interviewer obj pulling matching interviewer ID:', interview.interviewer)
    return element === interview.interviewer
  });

  // console.log(matchInterviewerWithStudent[0])
  const interviewerID = matchInterviewerWithStudent[0];

  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interviewerID];

  return interviewObj;
}