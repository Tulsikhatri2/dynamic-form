"use client"

import { fieldDataChange, getFormData, postFormData } from "@/Redux/Slice/dataSlice";
import { AppDispatch, RootState } from "@/Redux/store";
import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Components/Form";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const {formData, isLoading, formFields,isFormSuccess,isFormLoading} = useSelector((state:RootState) => state.data)

  useEffect(()=>{
      dispatch(getFormData()) 
  },[])

  if(isLoading){
    return <h1 style={{textAlign:"center"}}>Loding...</h1>
  }

  const handleFieldChange = (index: number, value: string) => {
    const data = {
      index: index,
      value:value
    }
    dispatch(fieldDataChange(data))
  };

  const handleSubmitData = () => {
    const formFields: { [key: string]: string } = {};
    formData.forEach((item: any) => {
      formFields[item.fieldName] = item.value;
    });
    dispatch(postFormData(formFields));
  };


  return (
    <Box sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding:"5vh",
        backgroundColor:"#B8B5AE"
    }}>
      <Typography
      sx={{fontFamily:"monospace",
        fontSize:"4vh",
        textDecoration:"underline",
        fontWeight:"bold",
        color:"maroon"
      }}>
        Dynamic Form
      </Typography>
      
      <FormControl sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
      }}>
        {formData.map((item:any, index) => (
          <Form key={index} item={item} index={index} handleFieldChange={handleFieldChange}/>
        ))}
        <Button variant="contained"
        sx={{marginTop:"2vh", backgroundColor:"maroon"}}
        onClick={handleSubmitData}
        disabled={isFormLoading}>
          Submit
        </Button>
      </FormControl>
      <Typography>
        {isFormSuccess ? JSON.stringify(formFields) :"" }
      </Typography>
    </Box>
  );
}
