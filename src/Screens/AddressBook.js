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
  const [filterData, setFilterData] = useState(null);
  // const { data, loading, error } = useQuery(GET_ALL_ADDRESS, {
  //   onCompleted: setCustomerData,
  // });
  const { data, loading, error } = useQuery(GET_ALL_ADDRESS);
  const [deleteCustomerAddress, deleteData] = useMutation(DELETE_ADDRESS);
  const history = useHistory();
  const { logout, setCustomerName } = useGlobalContext();

  //console.log(data && data.customer);
  console.log(error);
  console.log(customerData);

  useEffect(() => {
    if (customerData) {
      const { firstname, lastname } = customerData;
      setCustomerName(`${firstname} ${lastname}`);
    }
  }, [customerData]);

  useEffect(() => {
    if (!loading && data) {
      setCustomerData(data.customer);
      setFilterData(data.customer);
    }
  }, [loading, data]);

  if (
    error &&
    error.graphQLErrors.length > 0 &&
    error.graphQLErrors[0].message.includes(
      "The current customer isn't authorized"
    )
  ) {
    //console.log(JSON.stringify(error));
    deleteAuthToken();
    logout();
    history.push("/login");
  }

  const editHandler = (customer, theAddress) => {
    history.push("/new-address", {
      firstname: customer.firstname,
      lastname: customer.lastname,
      ...theAddress,
    });
  };
  const deleteHandler = async (theAddress) => {
    console.log(theAddress.id);

    if (
      window.confirm(`Sure want to Delete Address with id ${theAddress.id} ?`)
    ) {
      try {
        const result = await deleteCustomerAddress({
          variables: { idd: theAddress.id },
        });

        console.log(result);
        alert("Deleted Successfully!!!");
        const tempAddresses = customerData.addresses.filter(
          (tempAddress) => tempAddress.id !== theAddress.id
        );
        setCustomerData({ ...customerData, addresses: tempAddresses });
        setFilterData({ ...customerData, addresses: tempAddresses });
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  const searchHandler = (e) => {
    let value = e.target.value.toLowerCase();
    //let tempCustomerData = { ...customerData };
    let tempAddresses = customerData.addresses.filter((tempAddress) =>
      tempAddress.street[0].toLowerCase().includes(value)
    );
    //console.log(tempAddresses);
    setFilterData({
      ...customerData,
      addresses: tempAddresses,
    });
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
        {filterData && (
          <GridComponent
            customer={filterData}
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
