import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import { moduleExpression } from "@babel/types";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

    </article>
  );
}

// {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>}
// This code belongs to the "The Appointment Component" Exercise