import { createSlice } from '@reduxjs/toolkit';
import { statusState } from './constants';
import {
  apiDeleteContact,
  apiGetContactById,
  apiGetContacts,
  apiPostContact,
} from './operations';

const initialContacts = {
  contacts: [],
  contactById: null,
  status: statusState.idle, // "idle" | "pending" | "success" | "error"
  error: null,
  location: null,
};

const handlePending = (state, { payload }) => {
  state.status = statusState.error;
  state.error = payload;
};

const handleFulfilled = (state, { payload }) => {
  state.status = statusState.error;
  state.error = payload;
};

const handleRejected = (state, { payload }) => {
  state.status = statusState.error;
  state.error = payload;
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
      .addCase(apiGetContacts.rejected, (state, action) =>
        handleRejected(state, action)
      )

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
        handleRejected(state, action);
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
        handleRejected(state, action);
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
        handleRejected(state, action);
      }),
});

export const { addLocation } = contactsSlice.actions;
export const contactsReduser = contactsSlice.reducer;
