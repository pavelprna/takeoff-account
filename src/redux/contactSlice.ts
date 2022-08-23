import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

export interface ContactState {
  contacts: Contact[]
}

const initialState: ContactState = {
  contacts: [
    {
      id: '38339a43-548c-41f2-a983-1ba8f7cfec62',
      name: 'John Smith',
      email: 'john@ya.ru',
      phone: '+79990002255',
    },
    {
      id: '1d17f439-e8d1-4a76-a414-21e0069d2636',
      name: 'Michael Cho',
      email: 'mike@gmail.com',
      phone: '+79950008844',
    },
  ],
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    createContact: (state, { payload }: PayloadAction<Contact>) => {
      state.contacts.push({ ...payload, id: v4() })
    },
    updateContact: (state, { payload }: PayloadAction<Contact>) => {
      state.contacts = state.contacts.map((contact) =>
        contact.id === payload.id ? payload : contact
      )
    },
    deleteContact: (state, { payload: id }: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== id)
    },
  },
})

export const { createContact, updateContact, deleteContact } =
  contactsSlice.actions

export const contactsReducer = contactsSlice.reducer
