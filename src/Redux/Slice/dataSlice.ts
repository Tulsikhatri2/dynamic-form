import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
    formData: {fieldName:string,
        value:string,
        type:string
    }[],
    isLoading: boolean,
    isSuccess: boolean,
    isError:boolean,
    formFields:any,
    isFormLoading:boolean,
    isFormSuccess:boolean,
    isFormError:boolean,
}
const initialState: InitialState = {
    formData:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    formFields:{},
    isFormLoading:false,
    isFormSuccess:false,
    isFormError:false
}

const dataSlice = createSlice({
    name:"data",
    initialState: initialState,
    reducers:{
          fieldDataChange(state, action) {
            const { index, value } = action.payload;
            state.formData[index].value = value;
        },
    },
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
        .addCase(postFormData.pending,(state,action)=>{
            state.isFormLoading = true;
            state.isFormSuccess = false;
            state.isFormError = false
        })
        .addCase(postFormData.fulfilled,(state,action)=>{
            state.isFormLoading = false;
            state.isFormSuccess = true;
            state.isFormError = false;
            state.formFields = action.payload
        })
        .addCase(postFormData.rejected,(state,action)=>{
            state.isFormLoading = false;
            state.isFormSuccess = false;
            state.isFormError = true;
        })
    },
})

export const getFormData = createAsyncThunk(
    "GET/FORM/DATA",
    async()=>{
        try {
            const response = await axios.get("https://ulventech-react-exam.netlify.app/api/form")
            return response.data.data
        } catch (error) {
            console.log("Error: ",error)
        }
    }
)

export const postFormData = createAsyncThunk(
    "POST/FORM/DATA",
    async (formInfo: { [key: string]: string }) => {
      try {
        const response = await axios.post("https://ulventech-react-exam.netlify.app/api/form", formInfo);
        console.log(response.data,"response");
        return response.data
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  );

export default dataSlice.reducer

export const {fieldDataChange} = dataSlice.actions