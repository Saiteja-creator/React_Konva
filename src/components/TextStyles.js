import { v4 as uuidv4 } from 'uuid';

const TextStyle=[
    {
        textEditVisible: false,
        fill: "black",
        textX: 0,
        textY: 0,
        textYTextArea: 0,
        textXTextArea: 0,
        textValue: "Add Heading",
        fontSize: 26,
        fontFamily:"Arial",
        width: 200,
        y: 100,
        x: 100,
        height: 70,
        fontStyle: "bold",
        align: "left",
        id: uuidv4() ,
        type: 'text',
      },
      {
        textEditVisible: false,
        fill: "black",
        textX: 0,
        textY: 0,
        textYTextArea: 0,
        textXTextArea: 0,
        textValue: "Add Body",
        fontSize: 20,
        fontFamily:"Arial",
        width: 200,
        y: 100,
        x: 100,
        height: 70,
        fontStyle: "normal",
        align: "left",
        id: uuidv4() ,
        type: 'text',
      },
      {
        textEditVisible: false,
        fill: "black",
        textX: 0,
        textY: 0,
        textYTextArea: 0,
        textXTextArea: 0,
        textValue: "Add Sub Text",
        fontSize: 16,
        fontFamily:"Arial",
        width: 200,
        y: 100,
        x: 100,
        height: 60,
        fontStyle: "normal",
        align: "left",
        id: uuidv4() ,
        type: 'text',
      }

]


export default TextStyle