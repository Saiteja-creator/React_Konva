import React, { useState } from 'react';
import { Stage, Layer, Text, Rect, Group, Transformer } from 'react-konva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';

const CanvasPage = () => {
  const [textAttrs, setTextAttrs] = useState({
    text: 'Sample Text',
    fontSize: 20,
    fontStyle: 'Arial',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    align: 'left',
  });
  const [selectedId, setSelectedId] = useState(null);
  const [transformer, setTransformer] = useState(null);

  const handleStyleClick = (style) => {
    setTextAttrs((prevAttrs) => ({
      ...prevAttrs,
      [style]: !prevAttrs[style],
    }));
  };

  const handleAlignClick = (align) => {
    setTextAttrs((prevAttrs) => ({
      ...prevAttrs,
      align: align,
    }));
  };

  const handleFontSizeChange = (action) => {
    setTextAttrs((prevAttrs) => ({
      ...prevAttrs,
      fontSize: action === 'increase' ? prevAttrs.fontSize + 2 : prevAttrs.fontSize - 2,
    }));
  };

  const handleFontStyleChange = (e) => {
    setTextAttrs((prevAttrs) => ({
      ...prevAttrs,
      fontStyle: e.target.value,
    }));
  };

  return (
    <div>
      <div className='top-container'>
        <FontAwesomeIcon icon={faBold} onClick={() => handleStyleClick('isBold')} style={{ cursor: 'pointer' }} className='each_el' />
        <FontAwesomeIcon icon={faItalic} onClick={() => handleStyleClick('isItalic')} style={{ cursor: 'pointer' }} className='each_el' />
        <FontAwesomeIcon icon={faUnderline} onClick={() => handleStyleClick('isUnderline')} style={{ cursor: 'pointer' }} className='each_el' />
        <FontAwesomeIcon icon={faAlignLeft} onClick={() => handleAlignClick('left')} style={{ cursor: 'pointer' }} className='each_el'/>
        <FontAwesomeIcon icon={faAlignCenter} onClick={() => handleAlignClick('center')} style={{ cursor: 'pointer' }}className='each_el' />
        <FontAwesomeIcon icon={faAlignRight} onClick={() => handleAlignClick('right')} style={{ cursor: 'pointer' }} className='each_el'/>
        <div className='button-font-container'>
        <button onClick={() => handleFontSizeChange('decrease')} className='button'>-</button>
        <p className='text'>{textAttrs.fontSize}</p>
        <button onClick={() => handleFontSizeChange('increase')} className='button'>+</button>
        </div>
        <select onChange={handleFontStyleChange} value={textAttrs.fontStyle} className='font-style'>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Group
            draggable
            onTransform={(e) => {
              const node = e.target;
              setTextAttrs((prevAttrs) => ({
                ...prevAttrs,
                fontSize: node.fontSize() * node.scaleX(),
              }));
              node.scaleX(1);
              node.scaleY(1);
            }}
          >
            <Text
              text={textAttrs.text}
              fontSize={textAttrs.fontSize}
              fontFamily={textAttrs.fontStyle}
              fontStyle={textAttrs.isItalic ? 'italic' : 'normal'}
              textDecoration={textAttrs.isUnderline ? 'underline' : 'none'}
              fontWeight={textAttrs.isBold ? 'bold' : 'normal'}
              
              align={textAttrs.align}
              onDblClick={(e) => {
                setSelectedId(e.target.getParent().attrs.id);
                setTransformer(e.target.getParent());
              }}
            />
            {selectedId === 'text' && (
              <Transformer
                ref={setTransformer}
                anchorSize={5}
                borderEnabled={false}
                keepRatio={false}
                rotateEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 10 || newBox.height < 10) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasPage;
