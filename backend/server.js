const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCgKUYmaMTeQNa1MPWS6_LO6hTVxcxMSZY',
    Promise: Promise // Promises support is not enabled by default
});
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');
const cors = require('cors')


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

function findNearbyPlaces(amt, radi, query) {
    console.log('radi' + radi);
    return googleMapsClient.placesNearby({
        location: [41.8268, -71.4025], // Example latitude and longitude
        radius: Number(radi), // Search radius in meters
        type: query // Type of place
    }).asPromise()
    .then((response) => { // Handle response data
        return response.json.results.slice(0,amt);
    })
    .catch((err) => {
        console.error(err); // Handle error
    });
}

function generateUniqueId() {
    return crypto.randomBytes(3).toString('hex');
}
function recordVote(sessionId, participantId, optionId, made) {
    let session = sessions[sessionId];
    console.log('checking vote');
    if (session && session.participants[participantId]) {
      let participant = session.participants[participantId];
      participant.votedOptions.add(optionId);
      if (made) session.votes[optionId]+=1  
      // Check if the participant has voted for all options
      if (participant.votedOptions.size === session.places.length) {
        participant.hasVotedForAll = true;
      }
      console.log(session.votes);
      // After recording the vote, check if the game should end
      checkEndGame(sessionId);
    }
  }

  function checkEndGame(sessionId) {
    let session = sessions[sessionId];
    let allVotedForAll = Object.values(session.participants).every(participant => participant.hasVotedForAll);
    
    if (allVotedForAll) {
      // End the game
      endGame(sessionId);
    }
  }
  function getTopVotes(sessionId){
    votes =  sessions[sessionId].votes
    let maxIndex = 0;
    let maxVal = votes[0]
    votes.forEach((value, index) => {
        if (value > maxVal){
            maxIndex = index;
            maxVal = value;
        }
    })
    return {maxIndex, maxVal};
  }
  function endGame(sessionId) {
    // Notify participants the game has ended
    io.to(sessionId).emit('gameEnded', { winningIndex: getTopVotes(sessionId).maxIndex, votes: getTopVotes(sessionId).maxVal });
  }
  

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(cors({
    origin: "*",
    credentials: true
}))
let sessions = {
    'abc123': {
      // Participants in the session
      participants: {
        participantId1: { votedOptions: new Set(), hasVotedForAll: false },
        participantId2: { votedOptions: new Set(), hasVotedForAll: false },
      },
      votes: [],
      places: {
        'placeId1': {
          name: 'Place Name 1',
          votes: 0
        },
        'placeId2': {
          name: 'Place Name 2',
          votes: 0
        }
      }
    }
  };

  function getRandomElements(arr, n) {
    // Shallow copy the array to avoid mutating the original array
    let tempArr = arr.slice();
    
    // Fisher-Yates shuffle algorithm to shuffle the array
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]]; // ES6 array destructuring to swap elements
    }
    
    // Slice the first n elements from the shuffled array
    return tempArr.slice(0, n);
  }

io.on('connection', (socket) => {
    console.log('new connection')
    socket.on('createSession', async (data) => {
        console.log("distance:" + data.distance);
        queryPlaces = []
        for (const query of data.places){
          places = await findNearbyPlaces(data.amt, data.distance, query)
          queryPlaces = queryPlaces.concat(places);
        }
        qPlaces = getRandomElements(queryPlaces, data.amt)

        //console.log(queryPlaces);
        console.log('query: ' + queryPlaces);
        const sessionId = generateUniqueId();
        id = socket.id
        socket.join(sessionId);
        sessions[sessionId] = {
            votes: new Array(qPlaces.length).fill(0),
            places: qPlaces,
            participants: {},
        }
        sessions[sessionId].participants[id] = {votedOptions : new Set(), hasVotedForAll: false}
        console.log('session made');
        console.log(sessions[sessionId]);
        io.to(sessionId).emit('sessionCreated', {sessionId, places: sessions[sessionId].places});
    })
    socket.on('joinSession', ({ joinCode })=> {
        console.log('joining code: ' + joinCode);
        if (sessions[joinCode]){
            socket.join(joinCode);
            id = socket.id
            sessions[joinCode].participants[id] =  {votedOptions : new Set(), hasVotedForAll: false};
            socket.emit('joinedSession', {sessionId: joinCode, places: sessions[joinCode].places});
            console.log(sessions);
            io.to(joinCode).emit('newParticipant', { participantId: socket.id });
        } else{
            console.log('error');
            socket.emit('errorJoining', { message: 'Session does not exist.' });
        }
    })
    socket.on('makeVote', (data) => {
        placeId = data.placeId
        sessionId = data.joinCode
        particId = socket.id;
        made = data.made
        recordVote(sessionId, particId, placeId, made)
        console.log('vote made')
        socket.emit('voteCounted', {placeId}); 
    });
    
    console.log('a user connected');
});

const PORT  = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log('Listening on ${PORT}');
});