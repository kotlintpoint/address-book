import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NEW_ADDRESS, UPDATE_ADDRESS } from "../Queries";
import { useHistory, useLocation } from "react-router-dom";

function NewAddress() {
  let street = [];
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
      const {
        id,
        firstname,
        lastname,
        city,
        country_code,
        postcode,
        telephone,
      } = location.state;
      setAddress({
        id,
        firstname,
        lastname,
        city,
        telephone,
        postcode,
        country_code,
      });
    }
  }, []);

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "line1") {
      street[0] = value;
      setAddress({
        ...address,
        street: street,
      });
    } else if (name === "line2") {
      street[1] = value;
      setAddress({
        ...address,
        street: street,
      });
    } else {
      setAddress({
        ...address,
        [name]: value,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(address);

    if (address.id) {
      try {
        const result = await updateCustomerAddress({ variables: address });
        console.log(result);
        alert("Address Updated Success!!!");
        history.push("/address-book");
      } catch (error) {
        console.log(error);
      }
    } else {
      createCustomerAddress({ variables: address })
        .then((result) => {
          console.log(result);
          alert("Address Inserted Success!!!");
          history.push("/address-book");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  console.log("NewAddress", loading);
  console.log("NewAddress", data);

  return (
    <>
      <div className="address-form-container">
        <h3 style={{ textAlign: "center" }}>Add / Edit Address</h3>
        {loading && <div className="loader"></div>}
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
            <label htmlFor="line1">Address*</label>
            <input
              type="text"
              id="address1"
              name="line1"
              placeholder="201, Sidhdhnath Avenue..."
              onChange={changeHandler}
              value={address.line1}
            />
            <input
              type="text"
              id="address2"
              name="line2"
              placeholder="Masma, Olpad Road, ..."
              onChange={changeHandler}
              value={address.line2}
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
