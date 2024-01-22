import "./App.css";
import React, { useState } from "react";
import { marked } from "marked";
import data from "./data/data.json";
const App = () => {
  const [code, setCode] = useState("## Hello");
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');
  const [hide, hidePreview] = useState(true);
  const [show, showDocs] = useState(false);
  const openMD = () => {
    console.log(0);
    hidePreview(true);
    showDocs(false);
  };
  const openPreview = () => {
    console.log(0);
    hidePreview(false);
    showDocs(false);
  };

  const openDocs = () => {
    hidePreview(true);
    showDocs(true);
  };
  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };
  const docsData = data.basic_syntax.map((doc) => {
    return (
      <div key={doc.name}>
        <h1>{doc.name}</h1>
        <div className="description">{doc.description}</div>
        <div className="examples">
          {doc.examples.map((example, index) => (
            <div key={example.markdown} className="example">
              <h2>Example {index + 1}:</h2>
              <h3>-markdown</h3>
              <div>{example.markdown}</div>
              <h3>-html</h3>
              <div>{example.html}</div>
            </div>
          ))}
        </div>
        {doc.additional_examples.length > 0 && (
          <div className="examples">
            {doc.additional_examples.map((example) => (
              <div key={example.markdown} className="example">
                <h1>{example.name}</h1>
                <div className="description">{example.description}</div>
                <h3>-markdown</h3>
                <div>{example.markdown}</div>
                <h3>-html</h3>
                <div>{example.html}</div>
              </div>
            ))}
          </div>
        )}
        <hr />
      </div>
    );
  });

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button
            onClick={openMD}
            className={`btn ${hide && !show ? "active" : ""}`}
          >
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={`btn ${!hide && !show ? "active" : ""}`}
          >
            Preview
          </button>
          <button
            onClick={openDocs}
            className={`btn ${hide && show ? "active" : ""}`}
          >
            Docs
          </button>
        </div>
        {hide && !show ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : !hide && !show ? (
          <div>
            <textarea value={compiled} />
          </div>
        ) : (
          <div className="docs">{docsData}</div>
        )}
      </div>
    </>
  );
};

export default App;
