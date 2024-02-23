
import { createRoot } from 'react-dom/client';




import ExampleQuilEditor from './components/ExampleQuilPage';


const App=()=>{
  return (
    <div className='app-container w-screen'>
      <div className='top-container'>
       <div className='left_container shadow-lg flex justify-center font-bold '>Stickers</div>
       <div ><hr className='hr'/></div>
       
       <div className='right_container'>
        <div>
            <ExampleQuilEditor/>
        </div>

       </div>
      </div>
      
    </div>
  )
}

const containerEl = document.getElementById('root');
const root = createRoot(containerEl);
root.render(<App/>);
