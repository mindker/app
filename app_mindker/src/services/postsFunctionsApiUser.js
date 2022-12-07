import axios from 'axios';

export const loginUser = async (endpoint, credentials) => {
  try {
    return axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/users/${endpoint}`,
      data: credentials,
    }).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
};

export const RegisterUser = async (newUser) => {
  try {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/users`,
      data: newUser,
    }).then((res) => console.log(res));
  } catch (error) {
    console.log(error);
  }
};
