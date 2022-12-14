import axios from 'axios';

export const getAgnostic = async (endpoint, param) => {
  try {
    const data = await fetch(`http://localhost:8080/api/v1/${endpoint}/${param}`);
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (endpoint, credentials) => {
  try {
    return axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/users/${endpoint}`,
      data: credentials,
    }).then((res) => res.data);
  } catch (error) {
    return error;
  }
};

export const RegisterUser = async (newUser) => {
  try {
    return axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/users`,
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=AaB03x' +
          '--AaB03x' +
          'Content-Disposition: file' +
          'Content-Type: png' +
          'Content-Transfer-Encoding: binary' +
          '...data... ' +
          '--AaB03x--',
        Accept: 'application/json',
        type: 'formData',
      },
      data: newUser,
    });
  } catch (error) {
    return error;
  }
};

export const postDifficulty = async (difficulty) => {
  try {
    return axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/difficulties`,
      data: difficulty,
    });
  } catch (error) {
    return error;
  }
};

export const patchAgnostic = async (id, endpoint, token, updatedObject) => {
  try {
    return axios({
      method: 'patch',
      url: `http://localhost:8080/api/v1/${endpoint}/${id}`,
      headers: {
        Authorization: {
          toString() {
            return `Bearer ${token}`;
          },
        },
        'Content-Type':
          'multipart/form-data; boundary=AaB03x' +
          '--AaB03x' +
          'Content-Disposition: file' +
          'Content-Type: png' +
          'Content-Transfer-Encoding: binary' +
          '...data... ' +
          '--AaB03x--',
        Accept: 'application/json',
        type: 'formData',
      },
      data: updatedObject,
    });
  } catch (error) {
    console.log(error);
  }
};

export const CreateAgnosticItem = async (endpoint, newItem, token) => {
  try {
    return axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/${endpoint}`,
      headers: {
        Authorization: {
          toString() {
            return `Bearer ${token}`;
          },
        },
        'Content-Type':
          'multipart/form-data; boundary=AaB03x' +
          '--AaB03x' +
          'Content-Disposition: file' +
          'Content-Type: png' +
          'Content-Transfer-Encoding: binary' +
          '...data... ' +
          '--AaB03x--',
        Accept: 'application/json',
        type: 'formData',
      },
      data: newItem,
    }).then((res) => res.data.info.data);
  } catch (error) {
    return error;
  }
};
