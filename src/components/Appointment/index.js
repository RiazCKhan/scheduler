import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {

  const { bookInterview } = props

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    }).catch((error) => {
      console.log("CATCH bookInterview error", error)
    })
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty
          onAdd={() => { transition(CREATE) }}
        />)}

      {mode === CREATE && (
        <Form
          onCancel={() => { back(EMPTY) }}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

    </article>
  );
}