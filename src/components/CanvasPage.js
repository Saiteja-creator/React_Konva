import React, { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faRedo, faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const CanvasPage = () => {
  const [text, setText] = useState('Type your text here');
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('black');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1);
  };

  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  return (
    <div>
      <div className='header-container flex align-center shadow-lg '>

        <h5 className='header font-bold text-slate-400'>Post for customers missing orders cycle</h5>
        <div className='header-icons'>
          <FontAwesomeIcon icon={faUndo} className='mr-3'/>
          <FontAwesomeIcon icon={faRedo} className='mr-3'/>
          <button className="border-2 border-blue-300 text-center px-3 py-1 rounded-lg bg-blue-100 text-blue-600">Share Campaign</button>
        </div>
      </div>
      <hr className='hrVer'/>
      <div>
        <div className='flex p-3 shadow-lg mt-1 ml-0 align-middle h-13'>
          {/* Font style dropdown */}
          <select onChange={(e) => handleFontStyleChange(e)} className='border-solid border-2 border-gray-400 p-1 mr-2 '>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            {/* Add more font options if needed */}
          </select>
          {/* Font size controls */}
          <div className='flex align-middle'>
            <FontAwesomeIcon icon={faMinus} onClick={decreaseFontSize} className=' mr-0 font-normal w-2 border-solid border-2 p-2'/>
            <p className=' font-normal border-solid border-2 px-2 text-center'>{fontSize}</p>
            <FontAwesomeIcon icon={faPlus} onClick={increaseFontSize} className='mr-3  font-normal w-2 border-solid border-2 p-2' />
          
          </div>
          {/* Font size controls */}
          <FontAwesomeIcon icon={faBold} onClick={() => setIsBold(!isBold)} style={{ color: isBold ? 'blue' : 'black' }} className='mr-3 mt-2'/>
          <FontAwesomeIcon icon={faItalic} onClick={() => setIsItalic(!isItalic)} style={{ color: isItalic ? 'blue' : 'black' }} className='mr-3 mt-2' />
          <FontAwesomeIcon icon={faUnderline} onClick={() => setIsUnderline(!isUnderline)} style={{ color: isUnderline ? 'blue' : 'black' }} className='mr-3 mt-2' />
          {/* Implement alignment icons */}
          <FontAwesomeIcon icon={faAlignLeft}  className='mr-3 mt-2'/>
          <FontAwesomeIcon icon={faAlignCenter} className='mr-3 mt-2' />
          <FontAwesomeIcon icon={faAlignRight} className='mr-3 mt-2' />
          {/* Color picker */}
          <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className='mr-3 mt-1' />
          
        </div>
        <div className='bg-blue-100 h-screen flex justify-center'>
        
          <div className='bg-white w-4/5 h-70 mt-7 flex justify-center align-middle'>
            {/* Canvas area for text */}
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Text
                text={text}
                fontSize={fontSize}
                fill={fontColor}
                fontStyle={isItalic ? 'italic' : 'normal'}
                fontWeight={isBold ? 'bold' : 'normal'}
                textDecoration={isUnderline ? 'underline' : 'none'}
                x={window.innerWidth / 2}
                y={window.innerHeight / 2}
                align="center"
                width={200} // Set according to your requirement
                height={100} // Set according to your requirement
                draggable
                onDragEnd={(e) => {
                  setText(e.target.text());
                }}
                onTransformEnd={(e) => {
                  setText(e.target.text());
                }}
              />
            </Layer>
          </Stage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasPage;
