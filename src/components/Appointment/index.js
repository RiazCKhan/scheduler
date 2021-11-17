import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import "./styles.scss";

export default function Appointment(props) {

  const { time } = props

  return (
    <article className="appointment">
      <Header
        time={time}
      />
      {props.interview ? <Show /> : <Empty />}
    </article>
  );
}

// {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>}
// This code belongs to the "The Appointment Component" Exercise