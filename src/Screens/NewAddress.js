import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NEW_ADDRESS, UPDATE_ADDRESS } from "../Queries";
import { useHistory, useLocation } from "react-router-dom";

function NewAddress() {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState({
    id: undefined,
    firstname: "",
    lastname: "",
    city: "",
    telephone: "",
    country_code: "",
    street: [],
  });

  const history = useHistory();
  const location = useLocation();
  const [createCustomerAddress, { error, loading, data }] =
    useMutation(ADD_NEW_ADDRESS);

  const [updateCustomerAddress, update] = useMutation(UPDATE_ADDRESS);

  useEffect(() => {
    console.log(location);
    if (location.state) {
      var {
        id,
        firstname,
        lastname,
        city,
        country_code,
        postcode,
        telephone,
        street,
      } = location.state;
      setAddress({
        id,
        firstname,
        lastname,
        city,
        telephone,
        postcode,
        country_code,
        street,
      });
    }
  }, []);

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let tempAddress = { ...address };
    if (name === "street1") {
      tempAddress.street = [value, tempAddress.street[1]];
      setAddress(tempAddress);
    } else if (name === "street2") {
      tempAddress.street = [tempAddress.street[0], value];
      setAddress(tempAddress);
    } else {
      setAddress({
        ...address,
        [name]: value,
      });
    }
  };

  const showMessageAndRedirect = (msg, newAddress) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
      history.push("/address-book", {
        newAddress,
      });
    }, 2000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(address);

    if (address.id) {
      // update
      try {
        const result = await updateCustomerAddress({ variables: address });
        console.log(result);
        //alert("Address Updated Success!!!");
        showMessageAndRedirect("Address Updated Success!!!");
      } catch (error) {
        console.log(JSON.stringify(error));
        setErrorMessage(error.graphQLErrors[0].message);
        setTimeout(() => setErrorMessage(""), 2000);
      }
    } else {
      // insert
      createCustomerAddress({ variables: address })
        .then((result) => {
          console.log(JSON.stringify(result));
          //alert("Address Inserted Success!!!");
          const newAddress = result.data.createCustomerAddress;
          console.log(newAddress);
          showMessageAndRedirect("Address Inserted Success!!!", newAddress);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          setErrorMessage(error.graphQLErrors[0].message);
          setTimeout(() => setErrorMessage(""), 2000);
        });
    }
  };

  console.log("NewAddress", loading);
  console.log("NewAddress", data);

  return (
    <>
      {message && (
        <div id="snackbar" className="show">
          {message}
        </div>
      )}
      {errorMessage && (
        <div id="error-snackbar" className="show">
          {errorMessage}
        </div>
      )}
      <div className="address-form-container">
        <h3 style={{ textAlign: "center" }}>Add / Edit Address</h3>
        {(loading || update.loading) && <div className="loader"></div>}
        <form onSubmit={submitHandler}>
          <div className="container">
            <label>Address ID : #{address.id}</label>
            <div className="row">
              <div className="col-50">
                <label htmlFor="firstname">First Name*</label>
                <input
                  type="text"
                  id="first"
                  name="firstname"
                  placeholder="Ankit"
                  onChange={changeHandler}
                  value={address.firstname}
                />
              </div>
              <div className="col-50">
                <label htmlFor="lastname">Last Name*</label>
                <input
                  type="text"
                  id="last"
                  name="lastname"
                  placeholder="Sodha"
                  onChange={changeHandler}
                  value={address.lastname}
                />
              </div>
            </div>
            <label htmlFor="street1">Address*</label>
            <input
              type="text"
              name="street1"
              placeholder="201, Sidhdhnath Avenue..."
              onChange={changeHandler}
              value={address.street[0]}
            />
            <input
              type="text"
              name="street2"
              placeholder="Masma, Olpad Road, ..."
              onChange={changeHandler}
              value={address.street[1]}
            />
            <div className="row">
              <div className="col-50">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Surat"
                  onChange={changeHandler}
                  value={address.city}
                />
              </div>
              <div className="col-50">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Gujarat"
                  onChange={changeHandler}
                  value={address.state}
                />
              </div>
            </div>
            <label htmlFor="country_code">Country</label>
            <input
              type="text"
              id="country"
              name="country_code"
              placeholder="India"
              onChange={changeHandler}
              value={address.country_code}
            />
            <label htmlFor="telephone">Telephone*</label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              placeholder="+91 9090909090"
              onChange={changeHandler}
              value={address.telephone}
            />
            <button type="submit">Save Address</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewAddress;
