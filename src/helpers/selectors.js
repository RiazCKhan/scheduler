export function getAppointmentsForDay(state, day) {
  console.log('hi im state:', state)
  // console.log('hi im day:', day)

  const filteredDays = state.days.filter(day => day.name === day)
  return filteredDays
  // console.log(day)
  // console.log(day.name)
  // console.log(filteredDays)
  
  

}


function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

/* We need to start by finding the object in our state.days array who's name matches the provided day.
 With this information we can now access that specific days appointment array. */