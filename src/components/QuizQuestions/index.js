import React, { Component } from "react";
import IntlMessages from "util/IntlMessages";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import List from "@material-ui/core/List";
import Collapsible from "react-collapsible";
import Button from "@material-ui/core/Button";
import { questions } from "./data";
import { NavLink } from "react-router-dom";

class ReactTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x_access_key: "ZVYC-9AA9-13QT-484S",
      x_access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNTMwOTMyMzY2fQ.zqmGxDLhsKFomoYcDwFVArh5CZzSzJUrubHisOwEB80",
      userArray: [],
      questions
      // id: this.props.location.state === null ? 11 : this.props.location.state.key.id
    };
  }
  // componentDidMount() {
  //   this.props.location.state
  //     ? this.setState({
  //         id: this.props.location.state.key.id
  //       })
  //     : -1;

  //   // this.setState({id:})
  // }
  componentWillMount() {
    // console.log("in did mount", this.props, this.props.location.state.key);
    let data = this.state.x_access_key;
    let token = this.state.x_access_token;
    axios({
      method: "POST",
      url: "https://seenmeem.herokuapp.com/api/services/fetchQuiz",
      headers: {
        "x-access-key": data,
        "x-access-token": token
        // "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        quiz_id:
          this.props.location.state == null
            ? true
            : this.props.location.state.key
      }
    })
      .then(res => {
        let userArray = res.data.message;
        let quizID = JSON.parse(localStorage.quizID || null) || {};
        console.log("key", res, userArray, "quizID", quizID);

        // let all_user = [];
        // for (let i = 0; i < key.length; i++) {
        //   let k = key[i]
        //   all_user.push({
        //     DayNameEnglish: res.data.data[k].DayNameEnglish,
        //     DayNameArabic: res.data.data[k].DayNameArabic,
        //     OfferDate: res.data.data[k].OfferDate,
        //     ItemName: res.data.data[k].ItemName,
        //   })
        // }
        this.setState({ userArray, quizID });
      })
      .catch(err => {
        console.log("error in res", err);
      });
  }
  addQuizQues = obj => e => {
    console.log("obj", obj);
    this.props.history.push({
      pathname: "/app/questionslist",
      state: {
        key: obj
      }
    });
  };
  render() {
    // console.log("props", this.props.location.state.key);
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <Paper
            styleName="col-lg-12 h-100"
            heading={<IntlMessages id="Quiz Questions:" />}
          >
            <h1 className="ml-2 bold mb-5 mt-5 ">Quiz Questions:</h1>
            {(this.state.userArray.length >= 1
              ? this.state.userArray
              : questions
            ).map((item, i) => {
              return (
                <div
                  className="mr-5 ml-5"
                  style={{ lineHeight: "2px" }}
                  key={i}
                >
                  <Collapsible trigger={`Q#${i + 1}`}>
                    <h1>{item.question}</h1>
                    <List component="nav">
                      <div className="row mt-2 mb-2">
                        <p className="col">{`${`Q#${i + 1}`}    ${
                          item.answer
                        }`}</p>
                        {/* <NavLink to="/app/questionslist"> */}
                        <Button
                          className="float-right"
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={this.addQuizQues({
                            parent_id: i + 1,
                            question_name: "a"
                          })}
                        >
                          Search Questions
                        </Button>
                        {/* </NavLink> */}
                      </div>
                      <div className="row mt-2 mb-2">
                        <p className="col">{`${`Q#${i + 1}`} ${
                          item.option_b
                        }`}</p>

                        {/* <NavLink to="/app/questionslist"> */}
                        <Button
                          className="float-right"
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={this.addQuizQues({
                            parent_id: i + 1,
                            question_name: "b"
                          })}
                        >
                          Search Questions
                        </Button>
                        {/* </NavLink> */}
                      </div>
                      <div className="row mt-2 mb-2">
                        <p className="col">{`${`Q#${i + 1}`} ${
                          item.option_c
                        }`}</p>

                        {/* <NavLink to="/app/questionslist"> */}
                        <Button
                          className="float-right"
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={this.addQuizQues({
                            parent_id: i + 1,
                            question_name: "c"
                          })}
                        >
                          Search Questions
                        </Button>
                        {/* </NavLink> */}
                      </div>
                      <div className="row mt-2 mb-2">
                        <p className="col">{`${`Q#${i + 1}`} ${
                          item.option_d
                        }`}</p>

                        {/* <NavLink to="/app/questionslist"> */}
                        <Button
                          className="float-right"
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={this.addQuizQues({
                            parent_id: i + 1,
                            question_name: "d"
                          })}
                        >
                          Search Questions
                        </Button>
                        {/* </NavLink> */}
                      </div>
                    </List>
                  </Collapsible>
                </div>
              );
            })}
          </Paper>
        </div>
      </div>
    );
  }
}

export default ReactTables;
