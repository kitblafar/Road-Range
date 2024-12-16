# Road Range
This is a Vue.js frontend and Node.js backend web-app that plots RF data captured an Arduino live in the browser.

![Road Range](https://github.com/kitblafar/Road-Range/blob/master/Logo.png)

## Frontend
The frontend includes a login page which passes the login details to the backend to check. 
![login](https://github.com/kitblafar/Road-Range/blob/master/frontend/Demo/Demo1.png)

The live slip data page plots the live data from the car and the saved data page plots up to four requested datasets together.
![live data](https://github.com/kitblafar/Road-Range/blob/master/frontend/Demo/Demo2.png)

It uses Chart.js as the plotting library which allows for zooming and plot selection.
![saved data](https://github.com/kitblafar/Road-Range/blob/master/frontend/Demo/Demo3.png)

## Backend
The node.js backend connects to the receiver Arduino over Serial and opens a websocket to the frontend to allow for live data logging. Data saved to the SD card is also read here and can be passed to the frontend for saved data plotting.
The login functionality requires a password that is securely hashed and stored in the backend.
