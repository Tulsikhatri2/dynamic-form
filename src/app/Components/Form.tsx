import { RootState } from '@/Redux/store'
import { Box, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'


const Form = ({item,index, handleFieldChange}:any) => {

  const {isFormLoading} = useSelector((state:RootState)=>state.data)

  let inputElement;
  switch (item.type) {
    case "multiline":
      inputElement = (
        <TextareaAutosize
          name={item.fieldName}
          value={item.value}
          onChange={(e) => handleFieldChange(index, e.target.value)}
          cols={100}
          minRows={4}
          style={{
            border: `${isFormLoading ? "2px solid #959393" : "2px solid black"}`,
            color: `${isFormLoading ? "#959393" : "black"}`,
          }}
          className='textArea'
        />
      );
      break;

    case "select":
      inputElement = (
        <Select
          name={item.fieldName}
          aria-label={item.fieldName.toUpperCase()}
          value={item.value}
          type={item.type}
          onChange={(e) => handleFieldChange(index, e.target.value)}
          sx={{
            border: `${isFormLoading ? "2px solid #ACABAB" : "2px solid black"}`,
          }}
          className='selectOption'
          disabled={isFormLoading}
        >
          {item.options.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      );
      break;

    default:
      inputElement = (
        <TextField
          label={item.fieldName.toUpperCase()}
          name={item.fieldName}
          type={item.type}
          value={item.value}
          disabled={isFormLoading}
          onChange={(e) => handleFieldChange(index, e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#000",
              fontFamily: "monospace",
              fontWeight: "bold",
              width: "30vw",
              fontSize: "2.5vh",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2e2e2e",
                borderWidth: "2px",
                fontSize: "2vh",
              },
            },
            "& .MuiInputLabel-outlined": {
              color: "#2e2e2e",
              fontWeight: "bold",
              fontSize: "2vh",
            },
          }}
        />
      );
  }

  return (
    <>
    <Box key={index} sx={{ marginTop: "5vh", display: "flex", flexDirection: "column" }}>
        {inputElement}
    </Box>
    </>
  )
}

export default Form