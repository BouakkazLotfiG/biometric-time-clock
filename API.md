# Biometric Time Clock API Documentation

## Introduction

This document provides comprehensive documentation for the Biometric Time Clock API, which allows for managing employees and their check-in/check-out times.

---

## Table of Contents

1. [Employees](#employees)
   - [Create a New Employee](#create-a-new-employee)
   - [Get All Employees](#get-all-employees)
   - [Get Employees Based on Date of Creation](#get-employees-based-on-date-of-creation)
2. [Check-In and Check-Out](#check-in-and-check-out)
   - [Check-In](#check-in)
   - [Check-Out](#check-out)

---

## Employees

### Create a New Employee

- **Method**: `POST`
- **Endpoint**: `/employees/create`
- **Body**:
  ```json
  {
    "id": "string",
    "lastName": "string",
    "firstName": "string",
    "department": "string"
  }
  ```
- **Response**: "The created employee object"
- **Status Codes**: "The created employee object"
- **201**: "Successfully created."
- **400**: "Invalid input."

### Get all Employees

- **Method**: `GET`
- **Endpoint**: `/employees/`
- **Response**: "Array of all employee objects"
- **200**: "Success."

### Get Employees Based on Date of Creation

- **Method**: `GET`
- **Endpoint**: `/employees/by-date/:date`
- **Query Parameters:**: `/employees/by-date/{The date in YYYY-MM-DD format}`
- **Response**: "Array of employee objects created on the specified date."
- **200**: "Success."
- **400**: "Invalid date format.."

## Check-In and Check-Out

### Check-In

- **Method**: `POST`
- **Endpoint**: `/employees/:employeeId/check-in`
- **Parameters**: "employeeId"
- **Body**:
  ```json
  {
    "comment": "string"
  }
  ```
- **Response**: "Confirmation of check-in."
- **200**: "Successfully checked in."
- **404**: "Employee not found."
- **400**: " Already checked in or invalid input."

### Check-Out

- **Method**: `POST`
- **Endpoint**: `/employees/:employeeId/check-out`
- **Parameters**: "employeeId"
- **Body**:
  ```json
  {
    "comment": "string"
  }
  ```
- **Response**: "Confirmation of check-out. with the total time worked."
- **200**: "Successfully checked out."
- **404**: "Employee not found."
- **400**: " Already checked out or invalid input."
