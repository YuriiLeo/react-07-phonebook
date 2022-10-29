import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const isDublicate = ({ name, phone }, contacts) => {
    const normalizedName = name.toLowerCase();
    const normalizedPhone = phone.toLowerCase();

    const result = contacts.find((item) => {
        return (normalizedName === item.name.toLowerCase() && item.phone.toLowerCase() === normalizedPhone);
    });
        return Boolean(result);
};

const URL = "https://63584f04c26aac906f407738.mockapi.io";

const instance = axios.create({
    baseURL: URL,
});

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
    try {
        const {data} = await instance.get("/contacts");
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addContact = createAsyncThunk(
    "contacts/add",
    async (contact, thunkAPI) => {
    try {
        const response = await instance.post(
            "/contacts", contact);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
    },
        {
        condition: (data, { getState }) => {
        const { contacts } = getState();
            if (isDublicate(data, contacts.items)) {
            const mesage = toast.warn(`${data.name}  is already in contacts.`, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
               });
                return mesage(data);
            }
        }
    },
);

export const deleteContact = createAsyncThunk(
    "contacts/delete",
    async (contactID, thunkAPI) => {
    try {
        const response = await instance.delete(
            `/contacts/${contactID}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
    },
);


