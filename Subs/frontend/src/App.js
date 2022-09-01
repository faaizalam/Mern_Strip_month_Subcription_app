
import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import { Home } from './Screen/Home';
import { Login } from './Screen/Login';
import { Articalplan } from './Screen/Articalplan';
import { Artical } from './Screen/Artical';
import { ProtectedRouter } from './Component/ProtectedRouter';

function App() {

  
  return (
    <BrowserRouter>
    
    <div className="grid">
      <header>
   i am header
      </header>
      
      <main>
        <Routes>
          <Route path='/'  element={<Home/>}></Route>
         <Route path='/Artical' element={<Artical/>}></Route>
         <Route path='/Artical-plan' element={<Articalplan/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/plan' element={<Articalplan/>}></Route>
        </Routes>

      </main>
      <footer> i am a footer</footer>

    </div>
    
    </BrowserRouter>
  );
}

export default App;
