import { RootState } from '@/Redux/store'
import { Box, FormLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Form = ({item,index, handleFieldChange}:any) => {
  const {isFormLoading} = useSelector((state:RootState)=>state.data)
  console.log(isFormLoading,"fromSuccess")
  return (
    <Box key={index} sx={{ marginTop: "5vh", display: "flex", flexDirection: "column" }}>
            {item.type == "text" || item.type=="email" || item.type=="number" ?
            (
              <TextField
              label={item.fieldName.toUpperCase()}
              name={item.fieldName}
              type={item.type}
              value={item.value}
              onChange={(e)=>handleFieldChange(index,e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#000",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  width:"30vw",
                  fontSize:"2.5vh",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2e2e2e",
                    borderWidth: "2px",
                    fontSize:"2vh",
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "#2e2e2e",
                  fontWeight: "bold",
                  fontSize:"2vh",
                },
              }}
              disabled={isFormLoading}
              
            />
            ):item.type=="multiline"?(
              <TextareaAutosize
              name={item.fieldName}
              value={item.value}
              onChange={(e)=>handleFieldChange(index,e.target.value)}
              cols={100}
              minRows={4}
              style={{
                border:`${isFormLoading?"2px solid #ACABAB":"2px solid black"}`,
                textAlign:"center",
                paddingTop:"4vh",
                fontWeight: "bold",
                fontSize:"2.5vh",
                fontFamily:"monospace",
                color:`${isFormLoading?"#ACABAB":"black"}`,
                backgroundColor:"#B8B5AE"
              }}
              disabled={isFormLoading}
            />
            ):item.type=="select"?(
              <Select
              name={item.fieldName}
              aria-label={item.fieldName.toUpperCase()}
              value={item.value}
              type={item.type}
              onChange={(e)=>handleFieldChange(index,e.target.value)}
              sx={{
                width:"30vw",
                fontFamily: "monospace",
                fontWeight: "bold", 
                border:`${isFormLoading?"2px solid #ACABAB":"2px solid black"}`,
              }}
              disabled={isFormLoading}>
                {item.options.map((option:any)=>{
                  return(
                    <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                  )
                })}
              </Select>
            ):null}
            
          </Box>
  )
}

export default Form