# MERN E-SHOP

A simple MERN stack Ecommerce application

MERN stack is a collection of technologies that enables faster application development. It is used by developers worldwide. The main purpose of using MERN stack is to develop apps using JavaScript only. This is because the four technologies that make up the technology stack are all JS-based.

## MERN Stack Full Form

MERN Stack Components Why Should You Work With MERN Stack?Use Cases of MERNConclusion
MERN stack is a collection of technologies that enables faster application development. It is used by developers worldwide. The main purpose of using MERN stack is to develop apps using JavaScript only. This is because the four technologies that make up the technology stack are all JS-based. Thus, if one knows JavaScript (and JSON), the backend, frontend, and database can be operated easily.

### MERN Stack Full Form

MERN Stack is a compilation of four different technologies that work together to develop dynamic web apps and websites.

It is a contraction for four different technologies as mentioned below:

- M: MongoDB
- E: ExpressJS
- R: ReactJS
- N: NodeJS

### MERN Stack Components

There are four components of the MERN stack. Let’s discuss each of them one by one.

The first component is MongoDB, which is a NoSQL database management system.
The second MERN stack component is ExpressJS. It is a backend web application framework for NodeJS.
The third component is ReactJS, a JavaScript library for developing UIs based on UI components.
The final component of the MERN stack is NodeJS. It is a JS runtime environment, i.e., it enables running JavaScript code outside the browser.

## Setup application

This project requires Nodejs to be installed on your system

### Common setup

Clone the repo and install the dependencies.

- Install backend dependencies -> go to root directory

`npm install`

- Install frontend dependencies -> go to projectDir/frontend

`npm install`

### Set Env variables

create .env file in root directory with the following variables and add your values

```
PORT = 5000
MONGO_URI =
NODE_ENV = development
TOKEN_SECRET=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER="" //the email the mails will be sent from
SMTP_PASSWORD="" //the password of that email the mails will be sent from
FROM_EMAIL="" //the email the mails will be sent from
STRIPE_SECRET_KEY=
```

## Starting application

Before starting the application we have to run the seeding script to bring sample data

### Seed Script

In the seeding process, there are two main steps: deleting existing data and creating new data. To do both of these operations from root directory execute the following just once:
`npm run destroy`
`npm run import`

### Backend Server

- to run the backend server only execute from the root directory
  `npm run server`

### Frontend Server

- to run the frontend server only execute from projectDir/frontend
  `npm start`

### Development Server

- development server means to run both servers, execute from the root directory
  `npm run dev`

### Deployment

Congratulations! The application has been successfully deployed and is now accessible through the following link:
https://mern-shop-ehh8.onrender.com/
Access Instructions To access the application, simply click on the provided link or copy and paste it into your web browser's address bar. Once the page loads, you will be able to interact with the application's features and functionalities.
