import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const daysArray = props.days

  // console.log(daysArray)
  // console.log(props.days)

  const days = daysArray.map((day) => {
    // console.log(daysArray)
    // console.log(days)
    // console.log(day)

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    )
  })

  return (
    <ul>
      {days}
    </ul>
  );
}
