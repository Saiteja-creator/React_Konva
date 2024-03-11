import { text } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Html } from 'react-konva-utils';

export const TextEditor = ({
  textNodeRef,
  value,
  onChange,
  onBlur
}) => {
  const [style, setStyle] = React.useState();
  const [textEdit, setTextEdit] = React.useState(value);
  const [textareaHeight, setTextareaHeight] = React.useState(textNodeRef.current.height());
  
  React.useLayoutEffect(() => {
    const textNode = textNodeRef.current;
    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    const newStyle = {};
    newStyle.width = textNode.width() - textNode.padding() * 2 + 'px';
    newStyle.height = textNode.height() - textNode.padding() * 2 + 10 + 'px';
    newStyle.fontSize = textNode.fontSize() + 'px';
    newStyle.border = 'none';
    newStyle.padding = '0px';
    newStyle.overflow = 'hidden';
    
   
    newStyle.background = 'none';
    newStyle.outline = 'none';
    newStyle.resize = 'none';
    newStyle.lineHeight = textNode.lineHeight() + 0.01;
    newStyle.fontFamily = '"' + textNode.fontFamily() + '"';
    newStyle.transformOrigin = 'left top';
    newStyle.textAlign = textNode.align();
    newStyle.color = textNode.fill();
    newStyle.overflowWrap = 'break-word';
    newStyle.whiteSpace = 'normal';
    newStyle.userSelect = 'text';
    newStyle.wordBreak = 'normal';
    const margins = {
        top: textNode.y(),
        left: textNode.x(),
        right: textNode.getLayer().width() - (textNode.x() + textNode.width()),
        bottom: textNode.getLayer().height() - (textNode.y() + textNode.height())
      };
      newStyle.marginTop = margins.top + 'px';
      newStyle.marginLeft = margins.left + 'px';
      newStyle.marginRight = margins.right + 'px';
      newStyle.marginBottom = margins.bottom + 'px';
      newStyle.textDecoration=textNode.textDecoration()
      newStyle.fontWeight =textNode.fontStyle()
      

    if (JSON.stringify(newStyle) !== JSON.stringify(style)) {
      setStyle(newStyle);
    }
  });

  const handleTextareaChange = (event) => {
    let arrayRes=[]

    setTextEdit(event.target.value);
    if (textareaHeight !== event.target.scrollHeight){
      setTextareaHeight(event.target.scrollHeight);
    }

    
    arrayRes.push(textEdit)
    arrayRes.push(textareaHeight)
    onChange(arrayRes)
    
     // Adjusting textarea height based on content
    
  };

  return (
    <Html>
      <textarea
        className="polotno-input"
        style={{
          ...style,
        }}
        value={textEdit}
        onChange={(event) => {
          handleTextareaChange(event)
        }}
        onBlur={onBlur}
       
      />
    </Html>
  );
};