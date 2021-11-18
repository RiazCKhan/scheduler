import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import "./styles.scss";

export default function Appointment(props) {
  console.log('I am all props', props)
  // console.log('I am student', props.interview.student)
  // console.log('I am interviwer', props.interview)

  // const interviewerObj = props.interview.interviewer
  // console.log('interview obj:', props.interview.interviewer)
  // console.log("interviewObj Var:", interviewerObj)

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        /> : <Empty />}
    </article>
  );
}

// {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>}
// This code belongs to the "The Appointment Component" Exercise