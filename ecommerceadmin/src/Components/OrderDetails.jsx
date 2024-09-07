import React, { useContext } from 'react'
import EcomContext from '../Context/Ecomcontext'

const OrderDetails = ({order}) => {

    const {orderShow,setOrderShow,detailedproduct,findproduct} = useContext(EcomContext)

  return (
    <>
    <div className="fixed bg-[#00000091] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
        <div className={` z-[1] bg-blue-300 h-auto w-1/2 rounded-md p-2 drop-shadow-lg  animate-dropdown`}>
            <div className="flex justify-between px-5 items-center py-4">
                <p className="text-lg font-bold text-white">OrderDetails</p>
                <i onClick={()=>setOrderShow(false)} className="fa-solid fa-xmark cursor-pointer"></i>
            </div>
            <table className="basic">
              <thead>
                <tr>  
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                  {
                    detailedproduct.map(e=>(
                    <tr>
                      <td>
                        {e.title}
                      </td>
                      <td>
                      {
                        order.filter(id => id === e._id).length
                      }
                      </td>
                    </tr>
                    ))
                  }
              </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default OrderDetails