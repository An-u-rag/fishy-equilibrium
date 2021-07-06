# FishyEquilibrium
A web collaborative and strategic game developed which applies concepts of Nash equilibrium. 

Documentation 1 / Iteration 1:
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

Documentation 2 / Iteration 2:
- Features
  - Player can view their ID (first 4 characters of socket.id)
  - Position of Next Round button is more accessible now.

- Details
  - Methodology Details :
    - Implemented a _gameState Object which holds all the global values for a game instance : If everyone has submitted their answers, If a game    should move to next round, The Players array of player objects, Round Number.
  - HotFixes :
    - Fixed a bug where the a player could spam "Next Round" by himself and the game state would change. Now everyone has to click "Next Round".
    - Fixed a bug where if a player clicks "Next Round" after selecting a choice, the choice would be cleared. Now the choice stays in the buffer until they either change their choice manually or click "Submit". 
    - Fixed a bug where if a player clicks "Next Round" after everyone has clicked "Next Round", he could still manipulate the server value of the Round Count. This caused problems in different instances later in the game.
    - Fixed a bug where one person leaving the game would not change the number of players in the "players" array of objects in "_gameState" Object. 
  - Known Issues :
    - The game can only be played properly between 4 people with constant connection. If a player leaves, the game can not proceed to next round as it requires 4 votes to move on. However, if a new player joins, the game can move on. However, only that new user will have a clean slate of score, the rest of the players still will have the previous scores. This is assuming the player joins before a round starts. If the 4th player leaves after clicking "Submit" but NOT "Next Round", then the game will be stuck forever and the server needs to be restarted.
                 
Documentation 3 / Iteration 3 - React Integration:
  - Features
    - React added for frontend and complete UI Overhaul.
    - UI is more crisp and User friendly as well as organised.
    - Instructions added and Game Objective added.
    - Join Feature in to the room of 4 players with a nickname.
    - Player Stats are shown as well as other Players in the lobby.
    - Simple Chat box
  - Details
    - Methodology Details : 
      - Implemented a frontend or a client side javascript framework called React which is served requests from the Node.js server on the backend.
      - React dynamically updates the components of the DOM without the need for refreshing the page. It is used as a UI component renderer and view handler.
      - The stats are fetched in real time for the player from the server and displayed.
      - React also listens for incoming socket messages and loads it into the DOM. The DOM is also not just a HTML rather a JSX which allows us to put HTML into Javascript.
    - Known Issues :
      - The Player data of opponents is not synced and is "1 tick" behind loosely stated.
      - THe chat box is very primitivve and hence is vulnerable to errors.
 
Documentation 4 / Iteration 4 - React Integration fixes:
  - Features
    - Added Rounds Feature on the screen.
    - Festival Rounds added with a 10x multiplier for that round scores.
    - Chat feature is upgraded to include all the messages as well.
    - All players are now synced in real time.
    - Each player's status between "Picking", "Syncing", "Picked", "Submitted" and "Next->" are shown in real-time.
  - Details
    - Fixed Issues:
      - Stats of players are now in real time and not out of sync by 1 round or 1 tick
      - The chat is now better and all four people can communicate easily without confusion.
