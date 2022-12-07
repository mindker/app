import { FormLabel, Input, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillApi } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { loginUser } from '../../services/postsFunctionsApiUser';
import AgnosticButton from '../AgnosticButton/AgnosticButton';

const Login = () => {
  const navigate = useNavigate();
  const { setNickname, setUser, setLocal } = useContext(GlobalContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (values) => {
    (async () => {
      const res = await loginUser('login', values);
      if (res) {
        await setUser(res.info.data.user);
        await setLocal(res.info.data.token);
        navigate('dashboard');
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormLabel>
        <Text>Nickname</Text>
        <Input
          {...register('nickname', {
            required: true,
            minLength: 2,
          })}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="nickname"
          type="text"
        />

        {errors.nickname ? (
          <p className="error">
            Este campo es requerido y debe tener al menos 2 caracteres
          </p>
        ) : null}
      </FormLabel>

      <FormLabel>
        <Text>Password:</Text>
        <Input
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
      </FormLabel>
      <AgnosticButton
        text="Login"
        type="submit"
        variant="outline"
        leftIcon={<AiFillApi />}
        colorScheme="facebook"
      />
    </form>
  );
};
export default Login;
