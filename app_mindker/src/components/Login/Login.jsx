import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLocalStorage } from '../../custom/useLocalStorage';
import { loginUser } from '../../services/postsFunctionsApiUser';

const Login = () => {
  const [user, setUser] = useState();
  const [local, setLocal] = useLocalStorage(user);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      const res = await loginUser('login', values);
      await setUser(values.nickname);
      await setLocal(res);
    })();
  };
  console.log(local);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <label>
        <span>Nickname</span>
        <input
          {...register('nickname', {
            required: true,
            minLength: 2,
          })}
          placeholder="nickname"
          type="text"
        />

        {errors.nickname ? (
          <p className="error">
            Este campo es requerido y debe tener al menos 2 caracteres
          </p>
        ) : null}
      </label>

      <label>
        <span>Password:</span>
        <input
          {...register('password', {
            required: true,
            minLength: 6,
            pattern: /^\S*$/,
            validate: {
              format: (password) => {
                return /[a-z]/g.test(password) && /[0-9]/g.test(password);
              },
            },
          })}
          placeholder="*****"
          type="password"
        />

        {errors.password ? (
          <p className="error">
            {errors.password.type === 'format'
              ? 'La contraseña debe contener una minúscula y un número'
              : 'Este campo es requerido y debe tener al menos 6 caracteres'}
          </p>
        ) : null}
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
