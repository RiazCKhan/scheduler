import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";


import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "Saving";
const DELETING = "Deleting";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const confirmDeleteMessage = "Are you sure you would like to delete?"

export default function Appointment(props) {

  const { bookInterview, cancelInterview } = props

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      }).catch((error) => {
        console.log("CATCH bookInterview error", error)
      })
  }

  const onDelete = () => {
    transition(CONFIRM);
  }

  const onConfirm = () => {
    transition(DELETING);

    cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      }).catch((error) => {
        console.log("CATCH cancelInterview error", error)
      });
  }

  // const edit = (name, interviewer) => {
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  // }

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
          onDelete={onDelete}
          onEdit={() => { transition(EDIT) }}
        />
      )}

      {mode === SAVING && (
        <Status
          message={SAVING}
        />
      )}

      {mode === DELETING && (
        <Status
          message={DELETING}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={confirmDeleteMessage}
          onCancel={() => { back(EMPTY) }}
          onConfirm={onConfirm}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          onCancel={() => { back(EMPTY) }}
          onSave={save}
        />
      )}

    </article>
  );
}