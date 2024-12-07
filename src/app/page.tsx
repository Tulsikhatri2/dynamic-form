"use client"

import { fieldDataChange, getFormData, postFormData } from "@/Redux/Slice/dataSlice";
import { AppDispatch, RootState } from "@/Redux/store";
import { Box, Button, FormControl, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./components/Form";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const {formData, isLoading, formFields,isFormSuccess,isFormLoading} = useSelector((state:RootState) => state.data)

  useEffect(()=>{
      dispatch(getFormData()) 
  },[])

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
        width:"98vw",
    }}>
      {isLoading?
      <div className="custom-loader"></div>
    :
    (
      <>
      <Typography
      sx={{fontFamily:"monospace",
        fontSize:"4vh",
        textDecoration:"underline",
        fontWeight:"bold",
        color:"#474bff"
      }}>
        Dynamic Form
      </Typography>
      
      <FormControl sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
      }}>

        {formData.map((item:any, index:number) => (
          <Form key={index} item={item} index={index} handleFieldChange={handleFieldChange}/>
        ))}

        <Button variant="contained"
        sx={{marginTop:"2vh",
           backgroundColor:"#474bff",
           fontWeight:"bold",
          fontFamily:"monospace",
        fontSize:"3vh"}}
        onClick={handleSubmitData}
        disabled={isFormLoading}>
          Submit
        </Button>

      </FormControl>

      <Typography sx={{
        marginTop:"5vh",
        textAlign:"center",
        fontFamily:"monospace",
        fontWeight:"bold",
        fontSize:"2.5vh"
      }}>
        {isFormSuccess ? JSON.stringify(formFields) :"" }
      </Typography>
      </>
    )}
  
    </Box>
  );
}
