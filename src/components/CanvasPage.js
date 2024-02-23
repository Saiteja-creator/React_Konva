

import React, { useEffect, useRef, useState} from 'react';
import { Stage, Layer, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faRedo, faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// Import other necessary shapes if needed

import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Text, Transformer, Rect, Circle } from 'react-konva';
import Konva from 'konva';

const KonvaEditableText = () => {
  const textNodeRef = useRef(null);
  const transformerRef = useRef(null);
  const [fontStyle, setFontStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    if (textNodeRef.current) {
      const transformer = new Konva.Transformer({
        node: textNodeRef.current,
        enabledAnchors: ['middle-left', 'middle-right'],
        boundBoxFunc: (oldBox, newBox) => {
          newBox.width = Math.max(30, newBox.width);
          return newBox;
        },
      });
      transformerRef.current = transformer;
    }
  }, []);

  const handleTextTransform = () => {
    if (textNodeRef.current) {
      textNodeRef.current.hide();
      transformerRef.current.hide();

      const textPosition = textNodeRef.current.absolutePosition();

      const areaPosition = {
        x: textPosition.x,
        y: textPosition.y,
      };

      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      textarea.value = textNodeRef.current.text();
      textarea.style.position = 'absolute';
      textarea.style.top = areaPosition.y + 'px';
      textarea.style.left = areaPosition.x + 'px';
      textarea.style.width = textNodeRef.current.width() - textNodeRef.current.padding() * 2 + 'px';
      textarea.style.height = textNodeRef.current.height() - textNodeRef.current.padding() * 2 + 5 + 'px';
      textarea.style.fontSize = textNodeRef.current.fontSize() + 'px';
      textarea.style.border = 'none';
      textarea.style.padding = '0px';
      textarea.style.margin = '0px';
      textarea.style.fontWeight = fontStyle.bold ? 'bold' : 'normal'; // Apply bold style
      textarea.style.fontStyle = fontStyle.italic ? 'italic' : 'normal'; // Apply italic style
      textarea.style.textDecoration = fontStyle.underline ? 'underline' : 'none'; // Apply underline style
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'none';
      textarea.style.outline = 'none';
      textarea.style.resize = 'none';
      textarea.style.lineHeight = textNodeRef.current.lineHeight();
      textarea.style.fontFamily = textNodeRef.current.fontFamily();
      textarea.style.textAlign = textNodeRef.current.align();
      textarea.style.color = textNodeRef.current.fill();

      textarea.focus();

      function removeTextarea() {
        textarea.parentNode.removeChild(textarea);
        window.removeEventListener('click', handleOutsideClick);
        textNodeRef.current.show();
        transformerRef.current.show();
        transformerRef.current.forceUpdate();
      }

      textarea.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
          textNodeRef.current.text(textarea.value);
          removeTextarea();
        }
        if (e.keyCode === 27) {
          removeTextarea();
        }
      });

      textarea.addEventListener('keydown', (e) => {
        const scale = textNodeRef.current.getAbsoluteScale().x;
        textarea.style.width = textNodeRef.current.width() * scale + 'px';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + textNodeRef.current.fontSize() + 'px';
      });

      function handleOutsideClick(e) {
        if (e.target !== textarea) {
          textNodeRef.current.text(textarea.value);
          removeTextarea();
        }
      }
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
      });
    }
  };



  const handleFontSizeIncrement = () => {
    setFontSize(prevSize => prevSize + 1);
  };

  const handleFontSizeDecrement = () => {
    setFontSize(prevSize => Math.max(1, prevSize - 1));
  };

  const handleFontStyleChange = (style) => {
    setFontStyle(prevStyle => ({
      ...prevStyle,
      [style]: !prevStyle[style]
    }));
  };


  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          ref={textNodeRef}
          text="Some text here"
          x={50}
          y={80}
          fontSize={20}
          draggable
          width={200}
          onDblClick={handleTextTransform}
        />
        <Transformer ref={transformerRef} />
      </Layer>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <FontAwesomeIcon icon={faPlus} onClick={handleFontSizeIncrement} />
        <FontAwesomeIcon icon={faBold} onClick={() => handleFontStyleChange('bold')} />
        <FontAwesomeIcon icon={faItalic} onClick={() => handleFontStyleChange('italic')} />
        <FontAwesomeIcon icon={faUnderline} onClick={() => handleFontStyleChange('underline')} />
      </div>
    </Stage>
  );
};

export default KonvaEditableText;


// import React, { useEffect, useRef, useState } from 'react';
// import { Stage, Layer, Text, Transformer } from 'react-konva';
// import Konva from 'konva';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUndo, faRedo, faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// const KonvaEditableText = () => {
//   const textNodeRef = useRef(null);
//   const transformerRef = useRef(null);
//   const [fontSize, setFontSize] = useState(20); // Initial font size
//   const [fontStyle, setFontStyle] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });

//   useEffect(() => {
//     if (textNodeRef.current) {
//       const transformer = new Konva.Transformer({
//         node: textNodeRef.current,
//         enabledAnchors: ['middle-left', 'middle-right'],
//         boundBoxFunc: (oldBox, newBox) => {
//           newBox.width = Math.max(30, newBox.width);
//           return newBox;
//         },
//       });
//       transformerRef.current = transformer;
//     }
//   }, []);

//   const handleTextTransform = () => {
//     if (textNodeRef.current) {
//       textNodeRef.current.hide();
//       transformerRef.current.hide();

//       const textPosition = textNodeRef.current.absolutePosition();

//       const areaPosition = {
//         x: textPosition.x,
//         y: textPosition.y,
//       };

//       const textarea = document.createElement('textarea');
//       document.body.appendChild(textarea);

//       textarea.value = textNodeRef.current.text();
//       textarea.style.position = 'absolute';
//       textarea.style.top = areaPosition.y + 'px';
//       textarea.style.left = areaPosition.x + 'px';
//       textarea.style.width = textNodeRef.current.width() - textNodeRef.current.padding() * 2 + 'px';
//       textarea.style.height = textNodeRef.current.height() - textNodeRef.current.padding() * 2 + 5 + 'px';
//       textarea.style.fontSize = fontSize + 'px'; // Use state for font size
//       textarea.style.fontWeight = fontStyle.bold ? 'bold' : 'normal'; // Apply bold style
//       textarea.style.fontStyle = fontStyle.italic ? 'italic' : 'normal'; // Apply italic style
//       textarea.style.textDecoration = fontStyle.underline ? 'underline' : 'none'; // Apply underline style
//       textarea.style.border = 'none';
//       textarea.style.padding = '0px';
//       textarea.style.margin = '0px';
//       textarea.style.overflow = 'hidden';
//       textarea.style.background = 'none';
//       textarea.style.outline = 'none';
//       textarea.style.resize = 'none';
//       textarea.style.lineHeight = textNodeRef.current.lineHeight();
//       textarea.style.fontFamily = textNodeRef.current.fontFamily();
//       textarea.style.textAlign = textNodeRef.current.align();
//       textarea.style.color = textNodeRef.current.fill();

//       textarea.focus();

//       function removeTextarea() {
//         textarea.parentNode.removeChild(textarea);
//         window.removeEventListener('click', handleOutsideClick);
//         textNodeRef.current.show();
//         transformerRef.current.show();
//         transformerRef.current.forceUpdate();
//       }

//       textarea.addEventListener('keydown', (e) => {
//         if (e.keyCode === 13 && !e.shiftKey) {
//           textNodeRef.current.text(textarea.value);
//           removeTextarea();
//         }
//         if (e.keyCode === 27) {
//           removeTextarea();
//         }
//       });

//       textarea.addEventListener('keydown', (e) => {
//         const scale = textNodeRef.current.getAbsoluteScale().x;
//         textarea.style.width = textNodeRef.current.width() * scale + 'px';
//         textarea.style.height = 'auto';
//         textarea.style.height = textarea.scrollHeight + fontSize + 'px';
//       });

//       function handleOutsideClick(e) {
//         if (e.target !== textarea) {
//           textNodeRef.current.text(textarea.value);
//           removeTextarea();
//         }
//       }
//       setTimeout(() => {
//         window.addEventListener('click', handleOutsideClick);
//       });
//     }
//   };

//   const handleFontSizeIncrement = () => {
//     setFontSize(prevSize => prevSize + 1);
//   };

//   const handleFontSizeDecrement = () => {
//     setFontSize(prevSize => Math.max(1, prevSize - 1));
//   };

//   const handleFontStyleChange = (style) => {
//     setFontStyle(prevStyle => ({
//       ...prevStyle,
//       [style]: !prevStyle[style]
//     }));
//   };

//   return (
//     <Stage width={window.innerWidth} height={window.innerHeight}>
//       <Layer>
//         <Text
//           ref={textNodeRef}
//           text="Some text here"
//           x={50}
//           y={80}
//           fontSize={fontSize}
//           draggable
//           width={200}
//           fontStyle={fontStyle}
//           onDblClick={handleTextTransform}
//         />
//         <Transformer ref={transformerRef} />
//       </Layer>
//       <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
//         <FontAwesomeIcon icon={faPlus} onClick={handleFontSizeIncrement} />
//         <FontAwesomeIcon icon={faMinus} onClick={handleFontSizeDecrement} />
//         <FontAwesomeIcon icon={faBold} onClick={() => handleFontStyleChange('bold')} />
//         <FontAwesomeIcon icon={faItalic} onClick={() => handleFontStyleChange('italic')} />
//         <FontAwesomeIcon icon={faUnderline} onClick={() => handleFontStyleChange('underline')} />
//       </div>
//     </Stage>
//   );
// };

// export default KonvaEditableText;
