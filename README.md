# FishyEquilibrium
A web collaborative and strategic game developed which applies concepts of Nash equilibrium. 

Documentation 1:
- Features
  - basic server-client connections using websocket and socket.io.
  - Logics of game implemented.
  - Round score as well as overall score.
  - Logging events on web server.
  - QoS and Security changes
    - Disabled editing of "submit" "button" in client side HTML.
    - Can not press "submit" "button" without selected an option of amount of fish.

- Details
  - Modules/Software Implemented Server : Node.js, Express.js, socket.io,
  - Modules/Software Implemented Client : HTML, CSS, Javascript Vanilla, socket.io - client
  - Methodology Details : 
    - Implemented socket connectection from web server to the clients using socket.io. Event Listeners on client side are mainly click events and socket based event listeners
    - Whereas, the server side, the event listeners include the socket listeners as well as the express server listeners. 
    - A setInterval() function is used every 1 millisecond to update the corresponding player object on the client side. This is important because to handle client side logics, the client must know the information about the player and what the server has received about the player.
    - Information is passed between the client and server in various ways, some of them are global emits and some are based on per client or per socket. 
                 
