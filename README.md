
# Water and Gas Consumption Reading Backend

This project is a backend service that manages the individualized reading of water and gas consumption using AI to extract readings from meter images.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [POST /upload](#post-upload)
    - [PATCH /confirm](#patch-confirm)
    - [GET /{customer_code}/list](#get-customer_codelist)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This backend service is designed to manage the collection of water and gas consumption data by processing images of meters. The service integrates with Google's Gemini API to read and extract values from images, allowing users to upload meter readings and confirm or correct them later.

## Features

- Upload meter images in base64 format and retrieve the extracted consumption values.
- Confirm or correct the extracted values.
- List all readings for a specific customer, with optional filtering by meter type (WATER or GAS).
- Fully dockerized setup for easy deployment.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM library for MongoDB.
- **Docker**: Containerization platform.
- **Google Gemini API**: Used for analyzing meter images and extracting consumption values.

## Installation

1. Clone the repository:

    \`\`\`bash
    git clone https://github.com/yourusername/water-gas-consumption-backend.git
    cd water-gas-consumption-backend
    \`\`\`

2. Install the dependencies:

    \`\`\`bash
    npm install
    \`\`\`

3. Set up environment variables:

    Create a \`.env\` file in the root directory with the following content:

    \`\`\`bash
    GEMINI_API_KEY=<your_gemini_api_key>
    \`\`\`

4. Start the application:

    \`\`\`bash
    npm start
    \`\`\`

## Usage

### API Endpoints

#### POST /upload

Upload a meter image in base64 format, and the service will extract the consumption value using the Google Gemini API.

**Request Body:**

\`\`\`json
{
  "image": "base64_string",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" or "GAS"
}
\`\`\`

**Response:**

- \`200 OK\`:
  \`\`\`json
  {
    "image_url": "string",
    "measure_value": "integer",
    "measure_uuid": "string"
  }
  \`\`\`
- \`400 Bad Request\`:
  \`\`\`json
  {
    "error_code": "INVALID_DATA",
    "error_description": "string"
  }
  \`\`\`
- \`409 Conflict\`:
  \`\`\`json
  {
    "error_code": "DOUBLE_REPORT",
    "error_description": "Leitura do mês já realizada"
  }
  \`\`\`

#### PATCH /confirm

Confirm or correct the value extracted by the Gemini API.

**Request Body:**

\`\`\`json
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
\`\`\`

**Response:**

- \`200 OK\`:
  \`\`\`json
  {
    "success": true
  }
  \`\`\`
- \`400 Bad Request\`:
  \`\`\`json
  {
    "error_code": "INVALID_DATA",
    "error_description": "string"
  }
  \`\`\`
- \`404 Not Found\`:
  \`\`\`json
  {
    "error_code": "MEASURE_NOT_FOUND",
    "error_description": "Leitura não encontrada"
  }
  \`\`\`
- \`409 Conflict\`:
  \`\`\`json
  {
    "error_code": "CONFIRMATION_DUPLICATE",
    "error_description": "Leitura já confirmada"
  }
  \`\`\`

#### GET /{customer_code}/list

List all readings for a specific customer, with optional filtering by measure type.

**Query Parameters:**

- \`measure_type\` (optional): \`WATER\` or \`GAS\`

**Response:**

- \`200 OK\`:
  \`\`\`json
  {
    "customer_code": "string",
    "measures": [
      {
        "measure_uuid": "string",
        "measure_datetime": "datetime",
        "measure_type": "string",
        "has_confirmed": "boolean",
        "image_url": "string"
      }
    ]
  }
  \`\`\`
- \`400 Bad Request\`:
  \`\`\`json
  {
    "error_code": "INVALID_TYPE",
    "error_description": "Tipo de medição não permitida"
  }
  \`\`\`
- \`404 Not Found\`:
  \`\`\`json
  {
    "error_code": "MEASURES_NOT_FOUND",
    "error_description": "Nenhuma leitura encontrada"
  }
  \`\`\`

## Docker Setup

To run the application with Docker, follow these steps:

1. Build and run the containers:

    \`\`\`bash
    docker-compose up --build
    \`\`\`

2. The application will be accessible at \`http://localhost:3000\`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature/your-feature-name\`).
3. Make your changes.
4. Commit your changes (\`git commit -m 'Add some feature'\`).
5. Push to the branch (\`git push origin feature/your-feature-name\`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
