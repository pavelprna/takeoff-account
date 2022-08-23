import { Box, Button, Flex, FormControl, Input, Stack } from '@chakra-ui/react'
import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react'
import { signIn } from '../utils/auth'

export const Login = ({
  setLoggedIn,
}: {
  setLoggedIn: Dispatch<SetStateAction<boolean>>
}) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target
    console.log(values)
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const { token } = await signIn(values)
    if (token) {
      setLoggedIn(true)
      localStorage.setItem('jwt', token)
    }
  }

  return (
    <Flex
      height='100vh'
      width='100%'
      backgroundColor='gray.200'
      justifyContent='center'
      alignItems='center'
    >
      <Box minW={{ base: '300px' }}>
        <form onSubmit={handleSubmit}>
          <Stack
            spacing={4}
            backgroundColor='whiteAlpha.900'
            p={4}
            boxShadow='md'
          >
            <FormControl>
              <Input type={'text'} placeholder={'username'} />
            </FormControl>
            <FormControl>
              <Input type={'password'} placeholder='password' />
            </FormControl>
            <Button type='submit' variant={'solid'} colorScheme={'blue'}>
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  )
}
