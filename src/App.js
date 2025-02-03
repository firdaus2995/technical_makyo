import './App.css';
import './index.css';
import Dropdown from './components/Dropdown/Dropdown';

function App() {
  return (
    <div className="App">
      <div className='flex p-20 flex-col items-center justify-center w-full gap-4'>
        <p className='text-3xl font-bold'>Technical Test</p>
        <p>Muhamad Firdaus</p>
        <Dropdown />
      </div>
    </div>
  );
}

export default App;
