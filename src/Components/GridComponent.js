import React from "react";

function GridComponent({ customer, editHandler, deleteHandler }) {
  //console.log(customer);

  return (
    <div className="grid-container">
      {customer &&
        customer.addresses.map((theAddress) => (
          <div key={theAddress.id} className="container">
            <div className="row">
              <div className="col-50">
                <div className="grid-item">
                  <p>{theAddress.id}</p>
                  <p>
                    {customer.firstname} {customer.lastname}
                  </p>
                  <p>Address line 1</p>
                  <p>Address line 2</p>
                  <p>{theAddress.city}</p>
                  <p>{theAddress.state}</p>
                  <p>{theAddress.country_code}</p>
                  <p>{theAddress.telephone}</p>
                </div>
              </div>
              <div className="col-25" style={{ float: "right" }}>
                <p onClick={() => editHandler(customer, theAddress)}>
                  <i
                    className="fas fa-pen"
                    style={{ cursor: "pointer", fontSize: "24px" }}
                  ></i>
                </p>
                <p onClick={() => deleteHandler(theAddress)}>
                  <i
                    className="far fa-trash-alt"
                    style={{ cursor: "pointer", fontSize: "24px" }}
                  ></i>
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default GridComponent;
