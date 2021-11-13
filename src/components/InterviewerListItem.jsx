import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {

  console.log(props)



  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,

    /* 
    interviewers__item-image
    interviewers__item--selected
    interviewers__item--selected-image
    */
  })

  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}


// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };