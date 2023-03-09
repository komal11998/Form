import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Container,
  duration,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios"


const SubmissionForm = () => {

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    residentialAddress: {
      street1: '',
      street2: '',
    },
    isResidentialSameAsPermanent: false,
    permanentAddress: {
      street1: '',
      street2: '',
    },
    uploadedDocuments: [
      {
        fileName: '',
        fileType: '',
        file: null,
      },
    ],
  });
  const [error, setErrors] = useState({ uploadedDocuments: [] })

  console.log("error===>", error)
  const validateForm = () => {
    const errors = { residentialAddress: {}, uploadedDocuments: {}, uploadedDocuments: [] }
    const birthday = new Date(formState.dob)
    const age = (Date.now() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365)
    if (!formState.firstName) {
      errors.firstName = "First name is required"
    }
    if (!formState.lastName) {
      errors.lastName = "Last name is required"
    }
    if (!formState.email) {
      errors.email = "email is required"
    }
    if (!formState.dob) {
      errors.dob = "Date Of Birth is is required"
    }
    if (!formState.dob && age < 18) {
      errors.dob = "minimum age should be 18 "
    }
    if (!formState.residentialAddress.street1) {
      errors.residentialAddress.street1 = "Address is required"
    }
    if (!formState.residentialAddress.street2) {
      errors.residentialAddress.street2 = "Address is required"
    }
    const documnetsError = []
    formState.uploadedDocuments.forEach((ďocument) => {
      const errorObj = {}
      if (!ďocument.fileName) {
        errorObj.fileName = "File name is required"
      }
      if (!ďocument.fileType) {
        errorObj.fileType = "File type is required"
      }
      if (!ďocument.file) {
        errorObj.file = "Choose file"
      }
      documnetsError.push(errorObj)
    })
    errors.uploadedDocuments = documnetsError
    return errors
  }

  const handleSubmit = () => {
    const errors = validateForm()
    console.log("error===", errors)
    if (Object.keys(errors).length) {
      setErrors(errors)
      return
    }
    axios.post("localhost:8000/form", formState)
  }

  console.log("formState===>", formState)
  const handleAdd = () => {
    const updatedFormState = { ...formState }
    if (updatedFormState.uploadedDocuments.length < 2) {
      updatedFormState.uploadedDocuments.push({
        fileName: '',
        fileType: '',
        file: null,
      })
      setFormState(updatedFormState)
    }
  }

  const handleCheckbox = () => {
    if (!formState.isResidentialSameAsPermanent) {
      setFormState((prev) => (
        {
          ...prev,
          isResidentialSameAsPermanent: true,
          permanentAddress: prev.residentialAddress
        }))
    } else {
      setFormState((prev) => (
        {
          ...prev,
          isResidentialSameAsPermanent: false,
          permanentAddress: {
            street1: '',
            street2: '',
          }
        }))
    }
  }

  const handleChangeDocument = (value, key, index) => {
    setErrors({ uploadedDocuments: [] })
    const updatedFormState = { ...formState }
    const updatedItem = { ...updatedFormState.uploadedDocuments[index] }
    updatedItem[key] = value
    updatedFormState.uploadedDocuments[index] = updatedItem
    setFormState(updatedFormState)
  }

  const handleOnChange = (key, value) => {
    setErrors({ uploadedDocuments: [] })
    setFormState({ ...formState, [key]: value })
  }

  return (
    <section style={{ padding: "60px 0px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h1
              style={{
                textAlign: "center",
                fontSize: "40px",
                textTransform: "capitalize",
              }}
            >
              Submission Form
            </h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <p>First Name <span style={{ "color": "#db3131" }}>*</span></p>
            </Grid>

            <TextField
              required
              type="text"
              name="name"
              id="outlined-basic"
              placeholder='Enter your first name here'
              variant="outlined"
              style={{ width: "98%" }}
              value={formState.firstName}
              onChange={(e) => handleOnChange("firstName", e.target.value)}
            />
            {!!error.firstName && <Grid item xs={12}>
              <p style={{ "color": "red" }}>{error.firstName} </p>
            </Grid>}

          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <p>Last Name <span style={{ "color": "#db3131" }}>*</span></p>
            </Grid>
            <TextField
              required
              type="text"
              name="name"
              id="outlined-basic"
              placeholder='Enter your last name here'
              variant="outlined"
              style={{ width: "98%" }}
              value={formState.lastName}

              onChange={(e) => handleOnChange("lastName", e.target.value)}

            />
            {!!error.lastName && <Grid item xs={12}>
              <p style={{ "color": "red" }}>{error.lastName} </p>
            </Grid>}
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <p>E-mail <span style={{ "color": "#db3131" }}>*</span></p>
            </Grid>
            <TextField
              required
              type="email"
              name="email"
              id="outlined-basic"
              placeholder="ex: myname@example.com"
              variant="outlined"
              style={{ width: "98%" }}
              value={formState.email}

              onChange={(e) => handleOnChange("email", e.target.value)}

            />
            {!!error.email && <Grid item xs={12}>
              <p style={{ "color": "red" }}>{error.email} </p>
            </Grid>}

          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <p>Date of Birth <span style={{ "color": "#db3131" }}>*</span></p>
            </Grid>
            <TextField
              required
              name="dob"
              type="date"
              id="outlined-basic"
              variant="outlined"
              style={{ width: "98%" }}
              value={formState.dob}

              onChange={(e) => handleOnChange("dob", e.target.value)}

            />
            {!!error.dob && <Grid item xs={12}>
              <p style={{ "color": "red" }}>{error.dob} </p>
            </Grid>}

          </Grid>

          <Grid item xs={12}>
            <p>Residential Address</p>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <p>Street 1 <span style={{ "color": "#db3131" }}>*</span></p>
            </Grid>
            <TextField
              required
              type="text"
              name="street1"
              id="outlined-basic"
              variant="outlined"
              style={{ width: "98%" }}
              value={formState.residentialAddress.street1}
              onChange={(e) => {
                setErrors({ uploadedDocuments: [] })
                setFormState({ ...formState, residentialAddress: { ...formState.residentialAddress, street1: e.target.value } })
              }}
            />
            {!!error.residentialAddress?.street1 && <Grid item xs={12}>
              <p style={{ "color": "red" }}>{error.residentialAddress?.street1} </p>
            </Grid>}
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <p>Street 2 <span style={{ "color": "#db3131" }}>*</span></p>
            </Grid>
            <TextField
              required
              name="street2"
              id="outlined-basic"
              variant="outlined"
              style={{ width: "98%" }}
              value={formState.residentialAddress.street2}
              onChange={(e) => {
                setErrors({ uploadedDocuments: [] })
                setFormState({ ...formState, residentialAddress: { ...formState.residentialAddress, street2: e.target.value } })
              }}
            />
            {!!error.residentialAddress?.street2 && <Grid item xs={12}>
              <p style={{ "color": "red" }}>{error.residentialAddress?.street2} </p>
            </Grid>}
          </Grid>

          <Grid item xs={12}>
            <span>Same as Residential Address</span>
            <Checkbox onChange={handleCheckbox} checked={formState.isResidentialSameAsPermanent} />
          </Grid>
          <Grid item xs={12}>
            <p>Permanent Address</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <p>Street 1</p>
            </Grid>
            <TextField
              disabled={formState.isResidentialSameAsPermanent}
              id="outlined-basic"
              variant="outlined"
              style={{ width: "98%" }}
              value={formState.isResidentialSameAsPermanent ? formState.residentialAddress.street1 : formState.permanentAddress.street1}
              onChange={(e) => {
                setErrors({ uploadedDocuments: [] })
                setFormState({ ...formState, permanentAddress: { ...formState.permanentAddress, street1: e.target.value } })
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <p>Street 2</p>
            </Grid>
            <TextField
              disabled={formState.isResidentialSameAsPermanent}
              id="outlined-basic"
              variant="outlined"
              style={{ width: "98%" }}
              value={formState.isResidentialSameAsPermanent ? formState.residentialAddress.street1 : formState.permanentAddress.street2}
              onChange={(e) => {
                setErrors({ uploadedDocuments: [] })
                setFormState({ ...formState, permanentAddress: { ...formState.permanentAddress, street2: e.target.value } })
              }}
            />
          </Grid>

          <Grid item xs={12} >
            <p>Upload Documents</p>
            {formState.uploadedDocuments.map((document, index) => <>
              <Grid item xs={12} md={3}>
                <Grid item xs={12}>
                  <p>File name <span style={{ "color": "#db3131" }}>*</span></p>
                </Grid>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "50%" }}
                  value={document.fileName}
                  onChange={(e) => handleChangeDocument(e.target.value, "fileName", index)}
                />
                {!!error.uploadedDocuments[index]?.fileName && <Grid item xs={12}>
                  <p style={{ "color": "red" }}>{error.uploadedDocuments[index]?.fileName} </p>
                </Grid>}
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <Grid item xs={12}>
                    <p>Type of file <span style={{ "color": "#db3131" }}>*</span></p>
                  </Grid>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={document.fileType}
                    onChange={(e) => handleChangeDocument(e.target.value, "fileType", index)}
                  >
                    <MenuItem value="image">image</MenuItem>
                    <MenuItem value="pdf">pdf</MenuItem>
                  </Select>
                </FormControl>
                {!!error.uploadedDocuments[index]?.fileType && <Grid item xs={12}>
                  <p style={{ "color": "red" }}>{error.uploadedDocuments[index]?.fileType} </p>
                </Grid>}
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid item xs={12}>
                  <p> Upload File <span style={{ "color": "#db3131" }}>*</span></p>
                </Grid>
                <input type="file" value={document.file} accept={document.fileType === 'image' ? "image/*" : "pdf"}
                  onChange={(e) => {
                    if (document.fileType === 'image' && document.fileType.type === "image/*") {
                      return
                    }
                    handleChangeDocument(e.target.value, "file", index)
                  }}
                />
                {!!error.uploadedDocuments[index]?.file && <Grid item xs={12}>
                  <p style={{ "color": "red" }}>{error.uploadedDocuments[index]?.file} </p>
                </Grid>}
              </Grid>
            </>)}
          </Grid>
          <Grid item xs={12} md={3}>
            {formState.uploadedDocuments.length < 2 && <Button variant="contained" onClick={handleAdd}>+</Button>}
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default SubmissionForm