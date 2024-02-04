import io from 'socket.io-client'
//const SOCKET_IO_URL = 'http://localhost:5001'
const SOCKET_IO_URL = 'https://kickitbackend-54b10279ab31.herokuapp.com/'
const socket = io(SOCKET_IO_URL)
export default socket