import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    revokeCustomerToken {
      result
    }
  }
`;

export const GET_ALL_ADDRESS = gql`
  query {
    customer {
      firstname
      lastname
      email
      addresses {
        id
        city
        country_code
        region {
          region
          region_code
        }
        postcode
        telephone
      }
    }
  }
`;

export const ADD_NEW_ADDRESS = gql`
  mutation CreateCustomerAddress(
    $firstname: String!
    $lastname: String!
    $city: String!
    $telephone: String!
    $street: [String]
  ) {
    createCustomerAddress(
      input: {
        region: { region_id: 7 }
        country_code: US
        street: $street
        telephone: $telephone
        postcode: "77777"
        city: $city
        firstname: $firstname
        lastname: $lastname
        default_shipping: true
        default_billing: false
      }
    ) {
      id
      region {
        region
        region_code
      }
      country_code
      street
      telephone
      postcode
      city
      default_shipping
      default_billing
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateCustomerAddress(
    $id: Int!
    $city: String!
    $postcode: String!
  ) {
    updateCustomerAddress(
      id: $id
      input: { city: $city, postcode: $postcode }
    ) {
      id
      city
      postcode
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteCustomerAddress($idd: Int!) {
    deleteCustomerAddress(id: $idd)
  }
`;
