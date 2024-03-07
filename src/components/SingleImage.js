import React from "react"
import {Group,Image,Text,Transformer} from 'react-konva'
import useImage from 'use-image';



const SingleImage=({imageProps,isSelected,onSelect,onChange})=>{
  
  const [image] = useImage(imageProps.image);


  // const copy_obj={...imageProps}
  // delete copy_obj.image
  const imageRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);


  return (
      <React.Fragment>
        <Image onClick={onSelect}
        onTap={onSelect}
        ref={imageRef} 
        image={image}
        x={imageProps.x}
        y={imageProps.y}
        width={imageProps.width}
        height={imageProps.height}
        id={imageProps}
      
        draggable
        onDragEnd={(e) => {
          onChange({
            ...imageProps,
            // image:image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...imageProps,
            // image:image,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        />
        {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
        )}
      </React.Fragment>
      )
}

  export default SingleImage