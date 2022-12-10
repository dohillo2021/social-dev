import styled from 'styled-components';
import Link from 'next/link';
import { useForm } from 'react-hook-form'; // para criarmos o formulario
import { joiResolver } from '@hookform/resolvers/joi';// validar o formulário
import axios from 'axios';// para fazer a conexão do front com o back
import { useRouter } from 'next/router';// para levar o usuário aqui do login para a página que ele quer entrar se o login tiver certo

import { loginSchema } from '../modules/user/user.schema';

import ImageWithSpace from '../src/components/layout/ImageWithSpace';
import H1 from '../src/components/tipographfy/H1';
import H4 from '../src/components/tipographfy/H4';
import H2 from '../src/components/tipographfy/H2';
import Button from '../src/components/inputs/Button';
import Input from '../src/components/inputs/Input';

const FormContainer = styled.div`
  margin-top: 60px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 20px;
`
const Text = styled.p`
  text-align: center;
`

function LoginPage () {
  const router = useRouter()
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: joiResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      const { status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/user/login`, data)
      if (status === 200) router.push('/')
    } catch ({ response }) {
      console.log(response)
      if (response.data === 'Password Incorrect') {
        setError('password', {
          message: 'A senha está incorreta!'
        })
      }
      else if (response.data === 'not found') {
        setError('userOrEmail', {
          message: 'Usuário ou Email não cadastrado!'
        })
      }
    }
  }

  return(
    <ImageWithSpace>
      <H1># Social Dev</H1>
      <H4>Tudo que acontece no mundo dev, está aqui!</H4>
      
      <FormContainer>
        <H2>Entre em sua conta!</H2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Digite seu email" name="userOrEmail" control={control}/>
          <Input label="Sua senha" type="password" name="password" control={control}/>
          <Button type={'submit'} disabled={Object.keys(errors).length > 0}>Entrar</Button>
        </Form>
      </FormContainer>
      <Text>
        Não possui uma conta? <Link href='/signup'>Faça seu cadastro!</Link>
      </Text>
    </ImageWithSpace>
  )
}

export default LoginPage;