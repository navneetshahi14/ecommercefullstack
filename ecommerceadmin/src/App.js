import {Routes , Route, useSearchParams, useNavigate} from 'react-router-dom'
import Login from './Pages/Login';
import Otpcheck from './Pages/Otpcheck';
import { useContext, useEffect } from 'react';
import EcomContext from './Context/Ecomcontext';
import DashBoard from './Pages/DashBoard'


function App() {
  const {logged} = useContext(EcomContext)
  return (
    <>
      <div className="h-screen w-full " >
        <Routes>
          
          <Route path='/login' element={<Login isLogin={true} />}/>
          <Route path='/register' element={<Login isLogin={false} />}/>
          <Route path='/otpcheck' element={<Otpcheck />}/>
          <Route path='/' element={<DashBoard />} />
          <Route path='/products' element={<DashBoard />} />
          <Route path='/products/new' element={<DashBoard />} />
          <Route path='/products/edit/:Productid' element={<DashBoard />} />
          <Route path='/products/delete/:Productid' element={<DashBoard />} />
          <Route path='/category' element={<DashBoard />} />
          <Route path='/featured' element={<DashBoard />} />
          <Route path='/orders' element={<DashBoard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
