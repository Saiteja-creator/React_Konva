import React, { useEffect, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Image } from "react-konva";
import html2canvas from "html2canvas";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const ExampleQuilEditor = () => {
  const editorContainerRef = useRef();
  const stageRef = useRef();
  const shapeRef = useRef();

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  useEffect(() => {
    const quill = new Quill(editorContainerRef.current, {
      modules: {
        toolbar:toolbarOptions,
      },
      placeholder: "Compose an epic...",
      theme: "snow", // or 'bubble'
    });

    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = stageRef.current.getStage();
    stage.width(width);
    stage.height(height);

    const shape = shapeRef.current;
    shape.position({ x: 10, y: 10 });
    shape.draggable(true);

    const renderText = () => {
      html2canvas(editorContainerRef.current, {
        backgroundColor: "rgba(0,0,0,0)",
      }).then((canvas) => {
        shape.image(canvas);
        shape.getLayer().batchDraw();
      });
    };

    let timeout;
    const requestTextUpdate = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        timeout = null;
        renderText();
      }, 500);
    };

    quill.on("text-change", requestTextUpdate);
    renderText();

    return () => {
      quill.off("text-change", requestTextUpdate);
    };
  }, []);

  return (
    <div>
      <div
        id="editor-container"
        ref={editorContainerRef}
        style={{ height: "80px" }}
      >
        That is <u>some</u> <span style={{ color: "red" }}> styled text</span>{" "}
        on <strong>canvas</strong>!
        <h2>What do you think about it?</h2>
      </div>
      Rendered stage:
      <div id="container">
        <Stage ref={stageRef}>
          <Layer>
            <Image ref={shapeRef} scaleX={1 / window.devicePixelRatio} scaleY={1 / window.devicePixelRatio} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default ExampleQuilEditor;

