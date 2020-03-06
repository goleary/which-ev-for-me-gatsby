import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import Step from "@material-ui/core/Step"
import StepContent from "@material-ui/core/StepContent"
import StepLabel from "@material-ui/core/StepLabel"
import Stepper from "@material-ui/core/Stepper"

import PlacesAutocomplete from "@bit/goleary.locations.places-autocomplete"

import ChargeRadioGroup from "./_ChargeRadioGroup"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  stepContent: {
    display: "flex",
    flexDirection: "column",
  },
  formElement: {
    margin: theme.spacing(1),
  },
}))

export default function VerticalLinearStepper() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [home, setHome] = useState({
    location: null,
    canCharge: "yes",
  })
  const [work, setWork] = useState({
    location: null,
    canCharge: "yes",
  })
  const [numPassengers, setNumPassengers] = useState(4)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSubmit = () => {}

  // should I move this into the autocomplete component?
  const realizeLocation = location => ({
    formatted_address: location.formatted_address,
    geometry: {
      location: {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng(),
      },
    },
    name: location.name,
  })

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Where do you live?</StepLabel>
          <StepContent>
            <Box className={classes.stepContent}>
              <PlacesAutocomplete
                className={classes.formElement}
                label={"Home"}
                onPlaceSelected={location =>
                  setHome(prevState => ({
                    ...prevState,
                    location: realizeLocation(location),
                  }))
                }
                googleApiKey={"AIzaSyA26CwIAVe2RnPbj6C5qEQCac7I6cgsrNU"}
              />
              <ChargeRadioGroup
                className={classes.formElement}
                label="Can you charge your car here?"
                value={home.canCharge}
                onChange={event =>
                  setHome({ ...home, canCharge: event.target.value })
                }
              />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={!home.location}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Where do you work?</StepLabel>
          <StepContent>
            <Box className={classes.stepContent}>
              <PlacesAutocomplete
                name="Work"
                onPlaceSelected={location =>
                  setWork(prevState => ({
                    ...prevState,
                    location: realizeLocation(location),
                  }))
                }
                googleApiKey={"AIzaSyA26CwIAVe2RnPbj6C5qEQCac7I6cgsrNU"}
              />
              <ChargeRadioGroup
                className={classes.formElement}
                label="Can you charge your car here?"
                value={work.canCharge}
                onChange={event =>
                  setWork(prevState => ({
                    ...prevState,
                    canCharge: event.target.value,
                  }))
                }
              />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={!work.location}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            How many people do you need to be able to drive?
          </StepLabel>
          <StepContent>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="passengers"
                name="passengers"
                value={numPassengers}
                onChange={event =>
                  setNumPassengers(parseInt(event.target.value))
                }
              >
                <FormControlLabel value={1} control={<Radio />} label="1" />
                <FormControlLabel value={2} control={<Radio />} label="2" />
                <FormControlLabel value={4} control={<Radio />} label="3 - 4" />
                <FormControlLabel value={5} control={<Radio />} label="5" />
                <FormControlLabel value={6} control={<Radio />} label="6+" />
              </RadioGroup>
            </FormControl>
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      </Stepper>
    </div>
  )
}
