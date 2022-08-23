import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { Contact } from '../redux/contactSlice'

type ContactFormProps = {
  isOpen: boolean
  handleClose: () => void
  headerText: string
  submitButtonText: string
  handleSubmit: (contact: Contact) => void
  contact?: Contact | null
}

export const ContactForm = ({
  isOpen,
  handleClose,
  handleSubmit,
  headerText,
  submitButtonText,
  contact,
}: ContactFormProps) => {
  const [values, setValues] = useState<Contact>({
    id: '',
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (isOpen) {
      setValues({
        id: contact?.id ?? '',
        name: contact?.name ?? '',
        email: contact?.email ?? '',
        phone: contact?.phone ?? '',
      })
    }
  }, [isOpen, contact])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    handleSubmit(values)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type={'text'}
                  name='name'
                  onChange={handleChange}
                  value={values.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type={'email'}
                  name='email'
                  onChange={handleChange}
                  value={values.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  type={'tel'}
                  name='phone'
                  onChange={handleChange}
                  value={values.phone}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3}>
              {submitButtonText}
            </Button>
            <Button variant='ghost' onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
