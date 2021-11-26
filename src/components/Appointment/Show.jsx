import React from "react";

export default function Show(props) {
  // console.log(props.interviwers)
  // const interviewersArray = props.interviewers
  // console.log(interviewersArray[0].name)
  // console.log('show component:', props)

  const { remove } = props

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={remove}
          />
        </section>
      </section>
    </main>
  );
}



