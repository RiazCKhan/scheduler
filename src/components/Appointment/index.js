import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import "./styles.scss";

export default function Appointment(props) {
    return (
      <article className="appointment">
        {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>}
      </article>
    );
}
