import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    const res = await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });

    const data = await res.json();
    setOrderData(data); // data = { orderData: { email, order_data: [...] } }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="text-center mt-3">My Orders</h2>

        {orderData &&
        orderData.orderData &&
        orderData.orderData.order_data &&
        orderData.orderData.order_data.length > 0 ? (
          orderData.orderData.order_data
            .slice(0)
            .reverse()
            .map((order, idx) => (
              <div key={idx} className="mt-4">
                {order.map((item, i) =>
                  item.Order_date ? (
                    <div key={i} className="text-center">
                      <h5>{item.Order_date}{item.Order_time && ` at ${item.Order_time}`}</h5>
                      <hr />
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="col-12 col-md-6 col-lg-3 d-inline-block"
                    >
                      <div
                        className="card mt-3"
                        style={{ width: "16rem", maxHeight: "360px" }}
                      >
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt={item.name}
                          style={{ height: "120px", objectFit: "fill" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="container w-100 p-0">
                            <span className="m-1">{item.qty}</span>
                            <span className="m-1">{item.size}</span>
                            <div className="d-inline ms-2 fs-5">
                              ₹{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))
        ) : (
          <p className="text-center mt-5">No orders found</p>
        )}
      </div>
    </>
  );
}