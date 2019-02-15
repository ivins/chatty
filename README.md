# This Is Chatty App
A client-side SPA (single-page app) built with ReactJS

!["Screenshot of the main page"](https://github.com/silentscribe/chatty/blob/master/screenshots/Chat-window.png?raw=true)

Contains a chat log displaying messages and notifications. Usernames are displayed in different colors. Colours can be changed/added in the APP component.

Contains an input field to change your name and an input field to send a message.

The client-side app communicates with a server via WebSockets for multi-user real-time updates.

No persistent database is involved; the focus is on the client-side experience. A database could be added in if desired.


## How to Use

- Required- Node.js must be installed.
- Fork or clone then inside the main 'chatty' folder and the 'chatty_server' folder `npm install`.
- Then in the 'chatty_server' folder `node server.js`
- To start the client inside the main 'chatty' folder `npm start`.
- Open your browser and go to `http://localhost:3000/` and you will see your Chatty App running.

# Dependencies
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom

**Chatty Server dependencies are:**
- express
- ws
- uuid