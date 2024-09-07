import React, { useContext, useEffect, useState } from "react";
import EcomuserContext from "../Context/EcomuserContext";

const DetailedOrder = ({ list,orderstatuses }) => {
  const { orderdetail, setOrderdetail, findproduct, detailedproduct } = useContext(EcomuserContext);
  const [prod, setProd] = useState({});

  console.log(typeof(list))

  return (
    <>
      <div className="h-screen w-full bg-[#00000091] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
        <div className="min-w-[50%] min-h-1 bg-white p-2 rounded animate-dropdown">
          <div className=" flex w-full relative pb-5">
            <i
              onClick={() => setOrderdetail(false)}
              className="fa-solid fa-xmark right-0 absolute"
            ></i>
          </div>
          <div className="">
          <table className="basic">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantities</th>
              </tr>
            </thead>
            {
                detailedproduct.map(pro=>(
                    <tbody key={pro._id}>
                      <tr>
                        <td>
                          {pro.title}
                        </td>
                        <td>
                          {pro.price}
                        </td>
                        <td>
                          {
                            list.filter(id => id === pro._id).length
                          }
                        </td>
                      </tr>
                    </tbody>
                ))
              }
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedOrder;
