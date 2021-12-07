import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "Saving";
const DELETING = "Deleting";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const confirmDeleteMessage = "Are you sure you would like to delete?";
const errorSaveMessage = "Failed to save appointment";
const errorDeleteMessage = "Failed to delete appointment";

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
        transition(ERROR_SAVE)
        console.log("CATCH bookInterview error", error)
      })
  }

  const onConfirm = () => {
    transition(DELETING, true);

    cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      }).catch((error) => {
        transition(ERROR_DELETE, true)
        console.log("CATCH cancelInterview error", error)
      });
  }

  const onDelete = () => {
    transition(CONFIRM);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment"
    data-testid="appointment">
      

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
          interviewer={props.interview.interviewer.id}
          onCancel={() => { back(EMPTY) }}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          onClose={() => { back(EMPTY) }}
          message={errorSaveMessage}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          onClose={() => { back(EMPTY) }}
          message={errorDeleteMessage}
        />
      )}

    </article>
  );
}