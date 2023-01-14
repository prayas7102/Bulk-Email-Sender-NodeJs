import React from "react";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import DateTimePicker from 'react-datetime-picker';
import Button from 'react-bootstrap/Button';
import "./CkEditor.css";

const CkeEditor = () => {

  const [body, setbody] = useState("");
  const [value, onChange] = useState(new Date());

  const submitHandler = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/send-email",
      { msg: body },
    );
  }

  return (
    <div className="home">
      <div className="ck-content pen-green">
        <h2>Generic Notification System</h2>
        <CKEditor
          editor={ClassicEditor}
          data="<p style='color:blue;'>Hello from CKEditor 5!</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            setbody(data)
          }}
          onBlur={(event, editor) => {
            console.log("Blur.")
          }}
          onFocus={(event, editor) => {
            console.log("Focus.")
          }}
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "color",
                "red",
                editor.editing.view.document.getRoot()
              );
              writer.setStyle(
                "height",
                "200px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
        />
      </div>

      <div style={{ color: "black" }}>
        <DateTimePicker onChange={onChange} value={value} />
      </div>

      <div>
        <Button variant="warning" type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CkeEditor;
