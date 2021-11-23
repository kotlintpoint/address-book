import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ADDRESS, GET_ALL_ADDRESS } from "../Queries";
import GridComponent from "../Components/GridComponent";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../Components/WrapContext";
import { deleteAuthToken } from "../token";

function AddressBook() {
  const [customerData, setCustomerData] = useState(null);
  const { loading, error } = useQuery(GET_ALL_ADDRESS, {
    onCompleted: setCustomerData,
  });
  const [deleteCustomerAddress, deleteData] = useMutation(DELETE_ADDRESS);
  const history = useHistory();
  const { setCustomerName } = useGlobalContext();

  //console.log(data && data.customer);
  console.log(error);
  //console.log(customerData);

  useEffect(() => {
    if (customerData) {
      const { firstname, lastname } = customerData.customer;
      setCustomerName(`${firstname} ${lastname}`);
    }
  }, [customerData]);
  if (
    error &&
    error.graphQLErrors.length > 0 &&
    error.graphQLErrors[0].message.includes(
      "The current customer isn't authorized"
    )
  ) {
    //console.log(JSON.stringify(error));
    deleteAuthToken();
    history.push("/login");
  }

  const editHandler = (customer, theAddress) => {
    history.push("/new-address", {
      firstname: customer.firstname,
      lastname: customer.lastname,
      ...theAddress,
    });
  };
  const deleteHandler = (theAddress) => {
    console.log(theAddress.id);

    if (
      window.confirm(`Sure want to Delete Address with id ${theAddress.id} ?`)
    ) {
      deleteCustomerAddress({ variables: { idd: theAddress.id } })
        .then((result) => {
          console.log(result);
          alert("Deleted Successfully!!!");
          const tempAddress = customerData.customer.addresses.filter(
            (tempAddress) => tempAddress.id !== theAddress.id
          );
          setCustomerData({ ...customerData, addresses: tempAddress });
          //history.replace("/address-book");
          //window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  const searchHandler = (e) => {
    /*const value = e.target.value;
    const tempAddresses = customerData.customer.addresses.filter(
      (tempAddress) => tempAddress.city.includes(value)
    );
    console.log(tempAddresses);
    var NewData = { ...customerData };
    NewData.customer.addresses = [...tempAddresses];
    setCustomerData({
      NewData,
    });*/
  };

  return (
    <>
      <div className="address-book-container">
        <h3 style={{ textAlign: "center" }}>Address book</h3>
        <div className="center">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search Address Here..."
            style={{ width: "50%" }}
            onChange={searchHandler}
          />
        </div>
        {(loading || deleteData.loading) && (
          <div className="center">
            <div className="loader"></div>
          </div>
        )}
        {customerData && (
          <GridComponent
            customer={customerData.customer}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          ></GridComponent>
        )}

        <div className="center">
          <Link className="button" to="/new-address" style={{ width: "auto" }}>
            ADD NEW ADDRESS
          </Link>
        </div>
      </div>
    </>
  );
}

export default AddressBook;
