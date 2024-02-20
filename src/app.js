
import { createRoot } from 'react-dom/client';

import CanvasPage from './components/CanvasPage';


const App=()=>{
  return (
    <div >
      <h4 className='heading'>Post for customers missing orders cyle</h4>
      <CanvasPage/>
     
    </div>
  )
}

const containerEl = document.getElementById('root');
const root = createRoot(containerEl);
root.render(<App/>);
