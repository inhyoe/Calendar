import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import moment from "moment";
import "moment/locale/ko";
export default function FormsData(props) {
  // const { type, date, hour, min } = props.start
  return (
    <div id="me">
      {"start" in props ? (
        <>
          <div>{props.start.type}Time</div>

          <Form.Control
            ref={props.start.startDay}
            className="input-calendar"
            placeholder="24hours"
            defaultValue={moment().format("YYYY/MM/DD")}
            style={{ float: "left", width: "45%" }}
          />
          <Form.Control
            ref={props.start.startHour}
            className="input-calendar"
            placeholder="24hours"
            style={{ float: "left", width: "20%" }}
          />
          <div style={{ float: "left" }}>:</div>
          <div>
            <Form.Control
              ref={props.start.startMin}
              className="input-calendar"
              placeholder="24hours"
              style={{ float: "left", width: "25%" }}
            />
          </div>
        </>
      ) : (
        <>
          <div>{props.end.type}Time</div>

          <Form.Control
            ref={props.end.endDay}
            className="input-calendar"
            placeholder="24hours"
            defaultValue={moment().format("YYYY/MM/DD")}
            style={{ float: "left", width: "45%" }}
          />
          <Form.Control
            ref={props.end.endHour}
            className="input-calendar"
            placeholder="24hours"
            style={{ float: "left", width: "20%" }}
          />
          <div style={{ float: "left" }}>:</div>
          <div>
            <Form.Control
              ref={props.end.endMin}
              className="input-calendar"
              placeholder="24hours"
              style={{ float: "left", width: "25%" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
