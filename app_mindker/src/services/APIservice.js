import axios from 'axios';

export const getAgnostic = async (endpoint, param) => {
  return fetch(`http://localhost:8080/api/v1/${endpoint}/${param}`)
    .then((res) => res.json())
    .then((res) => res);
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
    axios({
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
    }).then((res) => console.log(res));
  } catch (error) {
    return error;
  }
};

export const updateService = async (endpoint, param, object) => {
  try {
    return await axios.patch(`http://localhost:8080/${endpoint}/${param}`, object);
  } catch (error) {
    console.log(error);
  }
};
export const patchAgnostic = async (id, endpoint, token, updatedObject) => {
  try {
    axios({
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
