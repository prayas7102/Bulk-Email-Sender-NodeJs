import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './CkEditor.css';

const CkeEditor = () => {
    return (
        <div className="ck-content pen-green">
            <h2>Generic Notification System</h2>
            <CKEditor
                editor={ClassicEditor}
                data="<p style='color:blue;'>Hello from CKEditor 5!</p>"
                onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                }}
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
            />
        </div>
    )
}

export default CkeEditor;