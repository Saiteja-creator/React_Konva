import React from "react";
import React, { useState, useRef, useEffect,useContext } from "react"
import { TextEditor } from "./TextEditor";



import {
  Stage,
  Layer,
  Text,
  Rect,
  Circle,
  Ellipse,
  Line,
  Image,
  TextPath,
  Star,
  Label,
  Group,
  RegularPolygon,
  Transformer
} from "react-konva";




export const Texto = ({
    shapeProps,
    isSelected,
    onSelect,
    onChange,
    index,
    handleTextDblClick,
    onChangeEvent
  }) => {
    
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    
    
    
   
    React.useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.setNode(shapeRef.current);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);

    
  
    return (
      <React.Fragment>
        <Group>
          <Text
            {...shapeProps}
            ref={shapeRef}
            fontSize={shapeProps.fontSize}
            align={shapeProps.align}
            fontStyle={shapeProps.fontStyle}
            fontFamily={shapeProps.fontFamily}
            draggable
            text={shapeProps.textValue}
            x={shapeProps.x}
            y={shapeProps.y}
            wrap="word"
            width={shapeProps.width}
            onDblClick={e => handleTextDblClick(e, index)}
            onClick={() => onSelect(index)}
            visible={!shapeProps.textEditVisible}
           
            onDragEnd={e => {
              onChange({
                ...shapeProps,
                x: e.target.x(),
                y: e.target.y()
              });
            }}
            onTransformEnd={e => {
              // transformer is changing scale
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              const newFontSize = shapeProps.fontSize * scaleY;
              // we will reset it back
              node.scaleX(1);
              node.scaleY(1);
              onChange({
                ...shapeProps,
                fontSize:newFontSize,
                rotation: node.rotation(),
                x: node.x(),
                y: node.y(),
                width: node.width() * scaleX,
                height: node.height() * scaleY
              });
            }}
          />{shapeProps.textEditVisible&& (
            <TextEditor
              value={shapeProps.textValue}
              textNodeRef={shapeRef}
              onChange={newValue => {
                
                onChangeEvent({
                  ...shapeProps,
                  textValue:newValue[0],
                  height:newValue[1]
                });
              }}
              onBlur={() => {
                onChange({
                  ...shapeProps,
                  textEditVisible:false
                })
              }}
            />
          )}
        </Group>
        {isSelected && <Transformer ref={trRef}flipEnabled={false}  />}
        
      </React.Fragment>
    );
  };