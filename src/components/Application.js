import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
const dailyAppointments = getAppointmentsForDay(state, state.day)

console.log("APP.JS STATE +++", state)
console.log("APP.JS DAY ---", state.day)


  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days}));

  useEffect(() => {
    const apiDays = axios.get("/api/days")
    const apiAppointments = axios.get("/api/appointments")
    // const apiInterviewers --- final end point = "/api/interviewers"

    Promise.all([
      apiDays,
      apiAppointments
    ]).then((all) => {
      console.log('im on everything', all)
      setState(prev => ({ ...prev, apiDays: all[0].data, apiAppointments: all[1].data }))
    }).catch((error) => {
      console.log("promise all api resolution error:", error)
    })
  }, []);

  const appointment = dailyAppointments.map((appt) => {
    // console.log(appt.interview)
    return (
      <Appointment
        key={appt.id}
        {...appt}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
