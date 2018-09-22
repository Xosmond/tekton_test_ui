import React from 'react'

export const API_URL = "http://localhost:3001/api/v1/"

export function displayError(errors) {
  var property_errors_main_all = []
  for (var property in errors) {
    if (errors.hasOwnProperty(property)) {
      var property_errors = errors[property].map((property_error)=>{return <li>{property_error}</li>;})
      property_errors_main_all.push(<p><h5>{property}</h5><ul>{property_errors}</ul></p>);
    }
  }
  return property_errors_main_all
}


