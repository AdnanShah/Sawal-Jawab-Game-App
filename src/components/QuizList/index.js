import React, { Component } from "react";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Collapsible from "react-collapsible";

class QuizList extends Component {
  constructor(props) {
    super(props);

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
  handleChangeRoute = id => event => {
    console.log("id", id);
   };
  createQuizRoute = () => {
    this.props.history.push("/app/createquiz");
  };
  quizDetailsRoute = id => e => {
    console.log("id", id);
    this.props.history.push({
      pathname: "/app/quizquestions",
      state: {
        key: id
      }
    });
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
            <div className="row">
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.createQuizRoute}
              >
                Create Quiz
              </Button>
            </div>
            <div className="">
              {this.state.quizlist !== "" ? (
                this.state.quizlist.map(item => {
                  return (
                    <div className="mr-5 ml-5" style={{ lineHeight: "2px" }}>
                      <Collapsible trigger={`Title:   ${item.quiz_name}`}>
                        <div className="col">
                          <div onClick={this.handleChangeRoute(item.id)}>
                            <h1>{item.quiz_name}</h1>
                            <br />
                            <br />
                          </div>
                          <p className="mr-5">{item.date}</p>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={this.quizDetailsRoute(item.id)}
                          >
                            Quiz Details
                          </Button>
                        </div>
                        <hr />
                      </Collapsible>
                    </div>
                  );
                })
              ) : (
                <div>Quiz List</div>
              )}
            </div>
          </CardBox>
        </div>
      </div>
    );
  }
}

export default QuizList;
