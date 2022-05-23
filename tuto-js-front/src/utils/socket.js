import io from 'socket.io-client';

const url = `${process.env.REACT_APP_TUTO_HEROKU_EXT}`;
console.log(url);

export default io(url);