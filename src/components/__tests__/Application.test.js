import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  prettyDOM
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  xit("renders without crashing", () => {
    render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      })
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    // 1. Render App
    // 2. Wait until Archie Cohen is displayed, i.e., app is loaded
    // 3. Click "Add Button" on the first empty appointment
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    // 5. Click the first interviewer in the list.
    // 6. Click the "Save" button on that same appointment.
    // 7. Check that the element with the text "Saving" is displayed.
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))
    // console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment")
    // console.log(prettyDOM(appointments));

    const appointment = appointments[0]
    // console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"))

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    // 1. Render App
    // 2. Wait until Archie Cohen is displayed, i.e., app is loaded
    // 3. Check 'Number of Spots'
    // 4. Locate Appointment in DOM
    // 5. Click 'Delete' icon
    // 6. Click 'Confirm'
    // 7. Check for 'Deleting' is displayed
    // 8. Expect Appointment to be null
    // 9. Check that the DayListItem with the text "Monday" to increase by +1.

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))
    // console.log(prettyDOM(container));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"))

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"))

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {



  })

})

