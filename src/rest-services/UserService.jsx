import RestService from "./RestService";
import axios from 'axios';
const basePath = '/user'
const UserService = {
  login: async (encodedCredentials) => {
  const config = {
    headers: {
      'Authorization': `Basic ${encodedCredentials}`
    }
  };

  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/token`, config);
    return response.data; // Return the data from the response if successful
}
 
};

export default UserService;
