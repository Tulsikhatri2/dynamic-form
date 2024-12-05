"use client"

import { getFormData, postFormData } from "@/Redux/Slice/dataSlice";
import { AppDispatch, RootState } from "@/Redux/store";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface FormData {
fieldName:string,
value:string,
type:string
}[]

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const {formData, isLoading} = useSelector((state:RootState) => state.data)
  const [formInfo, setFormInfo] = useState({})

  useEffect(()=>{
    const apiData = () => {
      dispatch(getFormData()) 
    }
    apiData()
  },[])

  if(isLoading){
    return <h1>Loding...</h1>
  }

  const handleSubmitData = () => {
    // dispatch(postFormData(formData))
  }

  return (
    <Box sx={{
      display:"flex",
        flexDirection:"column",
        alignItems:"center",
    }}>
      
      <FormControl sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
      }}>
        {formData.map((item:{fieldName:string,type:string,value:string},index)=>{
          return(
            <Box key={index} sx={{marginTop:"2vh", display:"flex",flexDirection:"column"}}>
            <FormLabel sx={{fontSize:"1.7vh"}}>{item.fieldName.toUpperCase()}</FormLabel>
            <TextField type={item.type} value={item.value}></TextField>
            </Box>
          )
        })}
        <Button variant="contained" 
      sx={{
        marginTop:"2vh"
      }}
      onClick={handleSubmitData}>Submit</Button>
      </FormControl>
      
    </Box>
  );
}
