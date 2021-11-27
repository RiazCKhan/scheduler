import React, { useState, useEffect } from "react";
import axios from "axios";

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
      // console.log('axios Data Check', all[1].data)
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

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((result) => {
        setState({
          ...state,
          appointments
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

    return axios.delete(`/api/appointments/${id}`)
      .then((result) => {
        setState({
          ...state,
          appointments
        })
      }).catch((error) => {
        console.log("CATCH axios delete error", error)
        return Promise.reject(error);
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;