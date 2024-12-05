import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
    formData: {fieldName:string,
        value:string,
        type:string
    }[],
    isLoading: boolean,
    isSuccess: boolean,
    isError:boolean
}
const initialState: InitialState = {
    formData:[],
    isLoading:false,
    isSuccess:false,
    isError:false
}

const dataSlice = createSlice({
    name:"data",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getFormData.pending,(state,action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getFormData.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.formData = action.payload
        })
        .addCase(getFormData.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
        })
    },
})

export const getFormData = createAsyncThunk(
    "GET/FORM/DATA",
    async()=>{
        try {
            const response = await axios.get("https://ulventech-react-exam.netlify.app/api/form")
            // console.log(response,"api response")
            return response.data.data
        } catch (error) {
            console.log("Error: ",error)
        }
    }
)

export const postFormData = createAsyncThunk(
    "POST/FORM/DATA",
    async(formInfo)=>{
        try {
           const response = await axios.post("https://ulventech-react-exam.netlify.app/api/form",{}) 
           console.log(response,"response")
        } catch (error) {
            console.log("Error: ",error)
        }
    }
)

export default dataSlice.reducer