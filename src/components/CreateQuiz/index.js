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
import { category, level } from "./data";

class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.addQuiz = this.addQuiz.bind(this);

    this.state = {
      creator: "",
      quizname: "",
      session: "",
      selectedDate: new Date(),
      x_access_key: "ZVYC-9AA9-13QT-484S",
      x_access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNTMwOTMyMzY2fQ.zqmGxDLhsKFomoYcDwFVArh5CZzSzJUrubHisOwEB80"
    };
  }
  addQuiz = () => {
    console.log("addQuiz", this.state);
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
        type: this.state.creator,
        type: this.state.quizname,
        type: this.state.session,
        type: this.state.selectedDate,
      }
    })
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("error in request", err);
      });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date.target.value });
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <CardBox
            styleName="col-lg-12"
            heading={<IntlMessages id="Create Quiz:" />}
          >
            <div className="row">
              <div className="col">
                <TextField
                  className=""
                  id="creator"
                  label="Enter Creator Name Here"
                  value={this.state.question}
                  onChange={this.handleChange("creator")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col">
                <TextField
                  className=""
                  id="quizname"
                  label="Enter Quiz Name Here"
                  value={this.state.quizname}
                  onChange={this.handleChange("quizname")}
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <TextField
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  id="date"
                  label="Date Of Quiz"
                  type="date"
                  // defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  style={{ marginTop: "15px" }}
                />
              </div>
              <div className="col-4">
                <TextField
                  className=""
                  id="session"
                  label="Enter Session Here"
                  value={this.state.session}
                  onChange={this.handleChange("session")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-2" style={{ marginTop: "25px" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.addQuiz}
                >
                  Crate Quiz
                </Button>
              </div>
            </div>
          </CardBox>
        </div>
      </div>
    );
  }
}

export default CreateQuiz;
