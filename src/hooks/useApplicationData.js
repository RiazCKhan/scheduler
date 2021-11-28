import { useState, useEffect } from "react";
import axios from "axios";

import { spotChecker } from "helpers/selectors";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    }).catch((error) => {
      console.log("CATCH all api resolution error:", error)
    })
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const index = state.days.findIndex((day) => {
      return day.name === state.day
    })
    // console.log('INDEX', index)

    const spotsRemaining = spotChecker(state, state.day)
    // console.log('#spotChecker', spotsRemaining)

    const days = [...state.days];
    // console.log('copy of DAY ARR', days)

    // console.log('SINGLE APPOINTMENT', appointment)
    // console.log('SINGLE APPOINTMENT INTERVIEW OBJ', appointment.interview)

    let day = {}
    
    // console.log('KRISS CONDITION', state.appointments[id].interview === undefined /// null)
    // console.log('WHAT AM I', state.appointments[id].interview)
    if (state.appointments[id].interview === null) {
      // console.log('Hit')
      day = { ...state.days[index], spots: spotsRemaining - 1 };
    } else {
      // console.log('Miss')
      day = { ...state.days[index] }
    }

    days.splice(index, 1, day)
    // console.log('DAY', day)

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((result) => {
        setState({
          ...state,
          appointments, days: days
        })
      }).catch((error) => {
        console.log("CATCH axios put error", error)
        return Promise.reject(error);
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const index = state.days.findIndex((day) => {
      return day.name === state.day
    })
    // console.log('INDEX', index)

    const spotsRemaining = spotChecker(state, state.day)
    // console.log('#spotChecker', spotsRemaining)

    const days = [...state.days];
    // console.log('copy of DAY ARR', days)

    const day = { ...state.days[index], spots: spotsRemaining + 1 };
    // console.log('DAY', day)

    days.splice(index, 1, day)

    return axios.delete(`/api/appointments/${id}`)
      .then((result) => {
        setState({
          ...state,
          appointments, days: days
        })
      }).catch((error) => {
        console.log("CATCH axios delete error", error)
        return Promise.reject(error);
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;