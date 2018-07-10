import React, { Component } from "react";
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
import axios from "axios";

const level = [
  {
    value: "simple",
    label: "Simple"
  },
  {
    value: "light",
    label: "Light"
  },
  {
    value: "medium",
    label: "Medium"
  },
  {
    value: "hard",
    label: "Hard"
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
class Form extends Component {
  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);

    this.state = {
      question: "",
      answer: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      level: "",
      category: "",
      addCategory: false,
      x_access_key: "ZVYC-9AA9-13QT-484S",
      x_access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNTMwOTMyMzY2fQ.zqmGxDLhsKFomoYcDwFVArh5CZzSzJUrubHisOwEB80"
    };
  }
  addQuestion() {
    console.log("addQuestion", this.state);
    let data = this.state.x_access_key;
    let token = this.state.x_access_token;

    axios({
      method: "POST",
      url: "https://seenmeem.herokuapp.com/api/services/createQuestion",
      headers: {
        "x-access-key": data,
        "x-access-token": token
      },
      data: {
        type: this.state.category,
        question: this.state.question,
        answer: this.state.answer,
        option_b: this.state.option2,
        option_c: this.state.option3,
        option_d: this.state.option4,
        difficulty: this.state.level
      }
    })
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("error in request", err);
      });
  }

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
                          <TextField
                            id="answer"
                            label="Answer"
                            value={this.state.answer}
                            onChange={this.handleChange("answer")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
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

              <div className="col-4 mt-5">
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
                    onClick={this.addQuestion}
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
