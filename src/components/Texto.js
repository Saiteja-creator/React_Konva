import React from "react";
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
  RegularPolygon,
  Transformer
} from "react-konva";


export const Texto = ({
    shapeProps,
    isSelected,
    onSelect,
    onChange,
    index,
    handleTextDblClick
  }) => {
    console.log("TEXTOREAD")
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
        <Text
          {...shapeProps}
          ref={shapeRef}
          fontSize={shapeProps.fontSize}
          align={shapeProps.align}
          fontStyle={shapeProps.fontStyle}
          draggable
          text={shapeProps.textValue}
          x={shapeProps.x}
          y={shapeProps.y}
          wrap="word"
          width={shapeProps.width}
          onDblClick={e => handleTextDblClick(e, index)}
          onClick={() => onSelect(index)}
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
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              rotation: node.rotation(),
              x: node.x(),
              y: node.y(),
              width: node.width() * scaleX,
              height: node.height() * scaleY
            });
          }}
        />
        {isSelected && <Transformer ref={trRef} />}
      </React.Fragment>
    );
  };