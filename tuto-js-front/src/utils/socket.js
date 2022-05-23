import io from 'socket.io-client';

const url = `${process.env.REACT_APP_TUTO_HEROKU}`;
console.log(url);

export default io(url);