# Biometric Time Clock API

## Overview

This document provides comprehensive documentation for installing and running the Biometric Time Clock API, which allows for managing employees and their check-in/check-out times.

## Prerequisites

- Node.js
- Docker

## Getting Started

### Installation

Follow these steps to get the application up and running with Docker:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/BouakkazLotfiG/biometric-time-clock.git

   ```

2. **Pull the Docker Image**:

   ```sh
   docker pull bouakkazlotfi/biometric-time-clock:latest

   ```

3. **Add env file**:

   ```sh
   MONGODB_URI=mongodb+srv://lotfi:lotfi@clinquedev.131nom5.mongodb.net/
   PORT=3000
   ```

   **_Displayed env values for demonstration purposes only_**

4. **Run with docker**:
   ```sh
   docker run --env-file .env -p 3000:3000 bouakkazlotfi/biometric-time-clock:latest
   ```

### Documentation

For detailed information about the API endpoints, please refer to the [API Documentation](API.md).

### Test using Postman API

1. **Open postman**: click on "Import" button and past the following link:

   ```sh
   https://api.postman.com/collections/24269231-e76e3ee6-1f8d-4231-81f2-ecb5e2506488?access_key=PMAT-01HE02NKFQPSR6C3KPHZJHAJ7R
   ```
