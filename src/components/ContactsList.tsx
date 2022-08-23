import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Contact,
  createContact,
  deleteContact,
  updateContact,
} from '../redux/contactSlice'
import { RootState } from '../redux/store'
import { ContactForm } from './ContactForm'

export const ContactsList = ({ onLogOut }: { onLogOut: () => void }) => {
  const {
    isOpen: isNewContactWindowOpen,
    onOpen: onNewContactWindowOpen,
    onClose: onNewContactWindowClose,
  } = useDisclosure()
  const {
    isOpen: isEditContactWindowOpen,
    onOpen: onEditContactWindowOpen,
    onClose: onEditContactWindowClose,
  } = useDisclosure()
  const { contacts } = useSelector((state: RootState) => state.contacts)
  const [currentContact, setCurrentContact] = useState<Contact | null>(null)
  const [searchedContacts, setSearchedContacts] = useState(contacts)

  const dispatch = useDispatch()

  useEffect(() => {
    setSearchedContacts(contacts)
  }, [contacts])

  const handleCloseAllModalWindows = () => {
    onNewContactWindowClose()
    onEditContactWindowClose()
  }

  const handleAddNewContact = (values: Contact) => {
    dispatch(createContact(values))
    onNewContactWindowClose()
  }

  const handleOpenNewContactWindow: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    onNewContactWindowOpen()
  }

  const handleOpenEditContactWindow = (contact: Contact) => {
    setCurrentContact(contact)
    onEditContactWindowOpen()
  }

  const handleEditNewContact = (values: Contact) => {
    dispatch(updateContact(values))
    onEditContactWindowClose()
  }

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id))
  }

  const handleSearch: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const term = value.toLowerCase()

    setSearchedContacts(
      contacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(term) ||
          contact.email.toLowerCase().includes(term) ||
          contact.phone.toLowerCase().includes(term)
        )
      })
    )
  }

  return (
    <Stack p={4} spacing={12} minH={'100vh'}>
      <Flex justifyContent={'space-between'}>
        <Heading>Contacts List</Heading>
        <HStack spacing={2}>
          <Button colorScheme={'blue'} onClick={handleOpenNewContactWindow}>
            Add new
          </Button>
          <Button colorScheme={'blue'} onClick={onLogOut}>
            LogOut
          </Button>
        </HStack>
      </Flex>

      <InputGroup alignItems={'center'} size={'lg'}>
        <InputLeftElement
          pointerEvents={'none'}
          color={'gray.300'}
          children={<SearchIcon />}
        />
        <Input onChange={handleSearch} placeholder='Search contacts' />
      </InputGroup>

      <TableContainer>
        <Table variant='simple' colorScheme='blue'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>email</Th>
              <Th>phone</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchedContacts.map((contact) => (
              <Tr key={contact.id}>
                <Td>{contact.name}</Td>
                <Td>{contact.email}</Td>
                <Td>{contact.phone}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label='Edit Contact'
                      variant={'outline'}
                      colorScheme={'blue'}
                      icon={<EditIcon />}
                      onClick={() => handleOpenEditContactWindow(contact)}
                    />
                    <IconButton
                      aria-label='Delete Contact'
                      variant={'outline'}
                      colorScheme={'red'}
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteContact(contact.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <ContactForm
        isOpen={isNewContactWindowOpen}
        handleClose={handleCloseAllModalWindows}
        headerText='New contact'
        submitButtonText='Add'
        handleSubmit={handleAddNewContact}
      />
      <ContactForm
        isOpen={isEditContactWindowOpen}
        handleClose={handleCloseAllModalWindows}
        headerText='Edit contact'
        submitButtonText='Save'
        handleSubmit={handleEditNewContact}
        contact={currentContact}
      />
    </Stack>
  )
}
