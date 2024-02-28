
import { createRoot } from 'react-dom/client';
import CreateContextProvider from '../context/CreateContext';

import StickerImage from './components/StickerImage';

import DynamicTextSticker from './components/DynamicText';

const App=()=>{
  return (
    <div className='app-container w-screen'>
      <div className='top-container'>
       <CreateContextProvider>
        <div className='left_container shadow-lg flex flex-col font-bold '>
          <h1 className='text-center'>Stickers</h1>
          <div><StickerImage/></div>
        </div>
        <div ><hr className='hr'/></div>
        
        <div className='right_container'>
          <div>
              <DynamicTextSticker/>
          </div>
        </div>
       </CreateContextProvider>
      </div>  
    </div>
  )
}

const containerEl = document.getElementById('root');
const root = createRoot(containerEl);
root.render(<App/>);
