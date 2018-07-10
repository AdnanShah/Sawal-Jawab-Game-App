import React from "react";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

const level = [
  {
    value: "Easy",
    label: "Easy"
  },
  {
    value: "Mid",
    label: "Mid"
  },
  {
    value: "Difficult",
    label: "Difficult"
  }
];
const category = [
  {
    value: "Science",
    label: "Science"
  },
  {
    value: "Islam",
    label: "Islam"
  },
  {
    value: "Other",
    label: "Other"
  }
];
class Form extends React.Component {
  state = {
    question: "",
    answer: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    level: "",
    category: "",
    addCategory: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  addCategory = () => {
    this.setState({ addCategory: !this.state.addCategory });
  };
  render() {
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <CardBox
            styleName="col-lg-12"
            heading={<IntlMessages id="Question:" />}
          >
            <div className="row">
              <TextField
                className=""
                id="question"
                label="Enter Question Here"
                value={this.state.question}
                onChange={this.handleChange("question")}
                margin="normal"
                fullWidth
              />
              <div className="col">
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Check the correct answer/answers options
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <div>
                          <Radio
                            checked={this.state.answer === "option1"}
                            onChange={this.handleChange("answer")}
                            value="option1"
                            name="option1"
                            aria-label="A"
                          />

                          {/* <Checkbox
                            onChange={this.handleChange("answer")}
                            value="option1"
                          /> */}
                          <TextField
                            id="option1"
                            label="Option#1"
                            value={this.state.option1}
                            onChange={this.handleChange("option1")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Radio
                            checked={this.state.answer === "option2"}
                            onChange={this.handleChange("answer")}
                            value="option2"
                            name="option2"
                            aria-label="A"
                          />
                          {/* <Checkbox
                            onChange={this.handleChange("answer")}
                            value="option1"
                          /> */}
                          <TextField
                            id="option2"
                            label="Option#2"
                            value={this.state.option2}
                            onChange={this.handleChange("option2")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Radio
                            checked={this.state.answer === "option3"}
                            onChange={this.handleChange("answer")}
                            value="option3"
                            name="option3"
                            aria-label="A"
                          />
                          {/* <Checkbox
                            onChange={this.handleChange("answer")}
                            value="option3"
                          /> */}
                          <TextField
                            id="option3"
                            label="Option#3"
                            value={this.state.option3}
                            onChange={this.handleChange("option3")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Radio
                            checked={this.state.answer === "option4"}
                            onChange={this.handleChange("answer")}
                            value="option4"
                            name="option4"
                            aria-label="A"
                          />
                          {/* <Checkbox
                            onChange={this.handleChange("answer")}
                            value="option4"
                          /> */}
                          <TextField
                            id="option4"
                            label="Option#4"
                            value={this.state.option4}
                            onChange={this.handleChange("option4")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
              </div>

              <div
                className="col-4 mt-5"
                //   style={{ border: "2px solid red" }}
              >
                <h1 className="text-danger text-center mb-2">
                  Mandatory Options
                </h1>
                <div className="">
                  {this.state.addCategory == false ? (
                    <TextField
                      select
                      value={this.state.category}
                      onChange={this.handleChange("category")}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Category
                          </InputAdornment>
                        )
                      }}
                    >
                      {category.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      id="category"
                      label="Category"
                      value={this.state.category}
                      onChange={this.handleChange("category")}
                      margin="normal"
                    />
                  )}
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="mt-2 text-center"
                    onClick={this.addCategory}
                  >
                    Add Other Category
                  </Button>
                  {/* </div>
                <div className=""> */}
                  <TextField
                    select
                    className="mt-5"
                    value={this.state.level}
                    onChange={this.handleChange("level")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Level</InputAdornment>
                      )
                    }}
                  >
                    {level.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mt-2 text-center"
                  >
                    Add Question
                  </Button>
                </div>
              </div>
            </div>
          </CardBox>
        </div>
      </div>
    );
  }
}

export default Form;
