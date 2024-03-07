
import { LeftPage } from "./components/LeftPage";
import { createRoot } from 'react-dom/client';
import {CreateContextProvider} from '../context/CreateContext';
import { RightContainer } from "./components/RightContainer";


const App=()=>{
  return (
    <div className="flex ">
      <CreateContextProvider>
        <div className="left-container">
          <LeftPage/>
        </div>
        <div ><hr className='hr'/></div>
        <div className="w-full">
           <RightContainer/>
        </div>
      </CreateContextProvider>
    </div>
  )
}




const containerEl = document.getElementById('root');
const root = createRoot(containerEl);
root.render(<App/>);
