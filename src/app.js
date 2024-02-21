
import { createRoot } from 'react-dom/client';

import CanvasPage from './components/CanvasPage';


const App=()=>{
  return (
    <div className='app-container'>
      <div className='top-container'>
       <div className='left_container shadow-lg'>left container</div>
       <div ><hr className='hr'/></div>
       
       <div className='right_container'>
        <div>
            <CanvasPage/>
        </div>

       </div>
      </div>
      
    </div>
  )
}

const containerEl = document.getElementById('root');
const root = createRoot(containerEl);
root.render(<App/>);
