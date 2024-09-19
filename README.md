# Blok

<p align="center">
<img src="./client/src/assets/logo.svg" style="width: 250px" alt="logo">
</p>
A minimalistic browser messenger

## Description

Blok is a minimalistic messenger built for simplicity in every aspect. Users find and connect with others through unique
IDs, eliminating the need for complicated searches. Its minimalism goes beyond the clean interface—logging in, creating
an account, and finding companions are all streamlined for ease and efficiency.

## Frontend

### Libraries used

+ React
+ React Router DOM
+ Redux Toolkit
+ React Hook Form
+ MUI
+ socket.io-client

### Features

+ **Build tool:** Vite
+ **Validation** and **Filling out** for forms made to meet the messenger's requirements
+ **Optimization** is implemented through decomposition of components and using special React hooks
+ **Styling** is written on SCSS and includes adaptability and cross-browser compatibility
+ **User's actions** in social network:
    + ***chatting*** is realized with WebSockets
    + ***finding another user to communicate:*** you can browse other users, copy their IDs and message them

## Backend

### Libraries used

+ Express
+ Mongoose
+ Validator
+ bcrypt
+ cors
+ jsonwebtoken
+ socket.io

### Features
+ **Database:** MongoDB
+ **Encryption:** bcrypt library
+ **Authentication:** JSON Web Tokens
+ **Messaging:** WebSockets. 
+ **Containerization:** Docker images and docker-compose file

## Try it

Messenger is deployed on http://95.183.12.121:80/
