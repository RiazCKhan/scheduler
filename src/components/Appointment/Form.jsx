import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer.id || null); // CHANGES MADE, set interviewer by ID and not OBJ
  const { onCancel, onSave } = props

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    onCancel()
  }

  console.log('this is form', interviewer)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={e => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => { onSave(student, interviewer) }}>Save</Button>
        </section>
      </section>
    </main>
  );
}