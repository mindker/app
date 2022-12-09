import axios from 'axios';

export const updateService = async (endpoint, param, object) => {
  try {
    return await axios.patch(`http://localhost:8080/${endpoint}/${param}`, object);
  } catch (error) {
    console.log(error);
  }
};
export const patchUser = async (id, token, updatedObject) => {
  try {
    axios({
      method: 'patch',
      url: `http://localhost:8080/api/v1/users/${id}`,
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
