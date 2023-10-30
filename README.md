# Biometric Time Clock API

## Overview

This document provides comprehensive documentation for installing and running the Biometric Time Clock API, which allows for managing employees and their check-in/check-out times.

## Prerequisites

- Node.js
- Docker

## Getting Started

### Installation

Follow these steps to get the application up and running with Docker:

1. **Pull the Docker Image**:

   ```sh
   docker pull bouakkazlotfi/biometric-time-clock:latest

   ```

2. **Add env file**:

   ```sh
   MONGODB_URI=mongodb+srv://lotfi:lotfi@clinquedev.131nom5.mongodb.net/
   PORT=3000
   ```

   **_Displayed env values for demonstration purposes only_**

3. **Run with docker**:
   ```sh
   docker run --env-file .env -p 3000:3000 bouakkazlotfi/biometric-time-clock:latest
   ```
