import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Replace with your backend server URL
//  withCredentials: true, // This will send the cookie with every request
});


// intercepting to capture errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    //const navigate = useNavigate();
    if (error && error.response && error.response.status === 404) {
      // window.location.href = '/not-found';
    } else if (error && error.response && error.response.status === 403) {
      // window.location.href = process.env.REACT_APP_HOMEPAGE+"/access-denied";
     // navigate('/access-denied')
    } else {
      switch (error.response.status) {
        case 401:
           window.location.href = `${process.env.REACT_APP_HOMEPAGE}/authentication/session-expired`;
          //navigate('/authentication/session-expired')
          break;
        case 403:
          message = "Access Forbidden";
          break;
        case 404:
          message = "Sorry! the data you are looking for could not be found";
          break;
        default: {
          message =
            error.response && error.response.data
              ? error.response.data["message"]
              : error.message || error;
        }
      }
      return Promise.reject(message);
    }
  }
);

export default instance;
