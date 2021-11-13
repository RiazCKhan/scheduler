import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function interviewerList(props) {

  // console.log(props) 

  const interviewersArray = props.interviewers

  const interviewers = interviewersArray.map((interviwer) => {
    return (
      <InterviewerListItem
        key={interviwer.id}
        name={interviwer.name}
        avatar={interviwer.avatar}
        id={interviwer.id}
        selected={interviwer.id === props.interviewer}
        setInterviewer={props.setCurrentInterviewerID}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  )
}