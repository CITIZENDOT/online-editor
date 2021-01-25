import React, { useState, useEffect, useRef } from "react";

import "./App.css";

// Render editor
function App() {
  const [code, setCode] = useState({
    html: "",
    css: "",
    js: "",
    selectionStart: -1,
  });

  const outputRef = useRef(null);
  const editorRef = useRef(null);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCode({
      ...code,
      [name]: value,
    });
  };

  const onKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.target;
      const { name } = event.target;
      setCode({
        ...code,
        [name]:
          code[name].substring(0, selectionStart) +
          "    " +
          code[name].substring(selectionEnd),
        selectionStart: selectionStart,
      });
    }
  };

  useEffect(() => {
    outputRef.current.srcdoc =
      code.html +
      "<style>" +
      code.css +
      "</style>" +
      "<script>" +
      code.js +
      "</script>";
  });

  return (
    <div className="content">
      <h1>Online Web Editor</h1>
      <div className="outer first">
        <div className="editor-wrapper">
          <h2>HTML</h2>
          <textarea
            onChange={handleChange}
            name="html"
            className="editor"
            placeholder="Code HTML here"
            onKeyDown={onKeyDown}
            ref={editorRef}
            value={code.html}
          ></textarea>
        </div>
        <div className="editor-wrapper">
          <h2>CSS</h2>
          <textarea
            onChange={handleChange}
            name="css"
            className="editor"
            placeholder="Code CSS here"
            onKeyDown={onKeyDown}
            ref={editorRef}
            value={code.css}
          ></textarea>
        </div>

        <div className="editor-wrapper">
          <h2>JAVSCRIPT</h2>
          <textarea
            onChange={handleChange}
            name="js"
            className="editor"
            placeholder="Code Javascript here"
            onKeyDown={onKeyDown}
            ref={editorRef}
            value={code.js}
          ></textarea>
        </div>
      </div>
      <div className="outer second">
        <iframe
          srcdoc=""
          ref={outputRef}
          className="output"
          title="OUTPUT"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
