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
        street
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
    $country_code: CountryCodeEnum
    $street: [String]
  ) {
    createCustomerAddress(
      input: {
        country_code: $country_code
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
    $firstname: String!
    $lastname: String!
    $city: String!
    $telephone: String!
    $country_code: CountryCodeEnum
    $street: [String]
  ) {
    updateCustomerAddress(
      id: $id
      input: {
        street: $street
        telephone: $telephone
        city: $city
        firstname: $firstname
        lastname: $lastname
        country_code: $country_code
      }
    ) {
      id
      firstname
      lastname
      city
      street
      telephone
      country_code
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteCustomerAddress($idd: Int!) {
    deleteCustomerAddress(id: $idd)
  }
`;
