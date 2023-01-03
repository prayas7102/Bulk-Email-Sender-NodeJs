import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./CkEditor.css";

const CkeEditor = () => {
  return (
    <div className="ck-content pen-green">
      <h2>Generic Notification System</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p style='color:blue;'>Hello from CKEditor 5!</p>"
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
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
  );
};

export default CkeEditor;
