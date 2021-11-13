import React from "react";

import "./styles.scss";

export default function Appointment(props) {
    return (
      <article className="appointment">
        {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>}
      </article>
    );
}
