import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { delContact, getContactById, getContacts, postContact } from 'services';
import { statusState } from './constants';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thankApi) => {
    try {
      const contacts = await getContacts();
      return contacts.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  }
);

export const apiGetContactById = createAsyncThunk(
  'contacts/apiGetContactById',
  async (contactId, thankApi) => {
    try {
      const contact = await getContactById(contactId);
      return contact.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  }
);

export const apiPostContact = createAsyncThunk(
  'contacts/apiPostContact',
  async (contactDetails, thankApi) => {
    try {
      const contacts = await postContact(contactDetails);
      return contacts.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (contactId, thankApi) => {
    try {
      const contacts = await delContact(contactId);
      return contacts.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  }
);

const initialContacts = {
  contacts: [],
  contactById: null,
  status: statusState.idle, // "idle" | "pending" | "success" | "error"
  error: null,
  location: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addLocation(state, action) {
      state.location = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      // ============= GET Contacts ===============
      .addCase(apiGetContacts.pending, (state, _) => {
        state.status = statusState.pending;
        state.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.status = statusState.success;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.status = statusState.error;
        state.error = action.payload;
      })
      // ============= GET Contact bu ID ===============
      .addCase(apiGetContactById.pending, (state, _) => {
        state.contactById = null;
        state.status = statusState.pending;
        state.error = null;
      })
      .addCase(apiGetContactById.fulfilled, (state, action) => {
        state.status = statusState.success;
        state.error = null;
        state.contactById = action.payload;
      })
      .addCase(apiGetContactById.rejected, (state, action) => {
        state.status = statusState.error;
        state.error = action.payload;
      })
      // ============= ADD Contact ===============
      .addCase(apiPostContact.pending, (state, _) => {
        state.status = statusState.pending;
        state.error = null;
      })
      .addCase(apiPostContact.fulfilled, (state, action) => {
        state.status = statusState.success;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(apiPostContact.rejected, (state, action) => {
        state.status = statusState.error;
        state.error = action.payload;
      })

      // ============= Delete Contact ===============
      .addCase(apiDeleteContact.pending, (state, _) => {
        state.status = statusState.pending;
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.status = statusState.success;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.status = statusState.error;
        state.error = action.payload;
      }),
});

export const { addLocation } = contactsSlice.actions;
export const contactsReduser = contactsSlice.reducer;
