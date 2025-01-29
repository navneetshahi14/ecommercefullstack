import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Cart from './Pages/Cart';
import Authpage from './Pages/Authpage';
import Otppage from './Pages/Otppage';
import Allproduct from './Pages/Allproduct';
import ProductPage from './Pages/ProductPage';
import Accountpage from './Components/Accountpage';
import { useContext } from 'react';
import EcomuserContext from './Context/EcomuserContext';
import Loader from './Pages/Loader';


function App() {

  const {loader} = useContext(EcomuserContext)

  return (
    <>
      <div className=" h-screen w-full">
        
        <Routes>
          <Route path='/login' element={<Authpage isRegistered={false} />}/>
          <Route path='/register' element={<Authpage isRegistered={true} />}/>
          <Route path='/otpcheck' element={<Otppage />}/>
          <Route path='/' element={<HomePage />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/AllProduct' element={<Allproduct />} />
          <Route path='/product/:Pid' element={<ProductPage />} />
          <Route path='/Account' element={<Accountpage />} />
        </Routes>
      </div> 
    </>
  );
}

export default App;
