import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.REACT_APP_TUTO_HEROKU_URL}`,
});
