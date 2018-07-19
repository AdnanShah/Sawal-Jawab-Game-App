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

class QuizList extends Component {
  constructor(props) {
    super(props);
    // this.addQuiz = this.addQuiz.bind(this);

    this.state = {
      quizlist: "",
      creator: "",
      quizname: "",
      session: "",
      selectedDate: new Date(),
      x_access_key: "ZVYC-9AA9-13QT-484S",
      x_access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNTMwOTMyMzY2fQ.zqmGxDLhsKFomoYcDwFVArh5CZzSzJUrubHisOwEB80"
    };
  }
  componentWillMount = () => {
    console.log("addQuiz", this.state);
    let data = this.state.x_access_key;
    let token = this.state.x_access_token;

    axios({
      method: "POST",
      url: "https://seenmeem.herokuapp.com/api/services/fetchQuizList",
      headers: {
        "x-access-key": data,
        "x-access-token": token
      }
      // data: {
      //   quiz_name: this.state.quizname,
      //   date: this.state.datetime
      //   // type: this.state.session,
      //   // type: this.state.selectedDate
      // }
    })
      .then(res => {
        console.log("res", res.data.message);
        this.setState({ quizlist: res.data.message });
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
            heading={<IntlMessages id="Quiz List:" />}
          >
            <div className="">
              {this.state.quizlist !== "" ? (
                this.state.quizlist.map(item => {
                  return (
                    // <div>
                    <div className="row">
                      <div className="col">
                        <h1>{item.quiz_name}</h1>
                        <p className="mr-5">{item.date}</p>
                      </div>
                      <br />
                      <hr />
                    </div>
                  );
                })
              ) : (
                <div>Quiz List</div>
              )}
              <div className="col-2 float-left" style={{ marginTop: "25px" }}>
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

export default QuizList;
