# This Is Chatty App
Primarily a client-side SPA (single-page app) built with ReactJS

Contains a chat log displaying messages and notifications.

Contains an input field to change your name and an input field to send a message.

The client-side app communicates with a server via WebSockets for multi-user real-time updates.

No persistent database is involved; the focus is on the client-side experience. A database could be added in if desired.

## How to Use

- Required- Node.js must be installed.
- Fork or clone then inside the 'chatty' folder and the 'chatty_server' folder `npm install`.
- Then in the 'chatty_server' folder `node server.js`
- To start the client inside the 'chatty' folder `npm start`.
- Open your browser and go to localhost:3000/ and you will see your Chatty App running.