import React, { Component } from "react";
import "./App.css";

/* 리액트는 라이브러리이다. 
리액트를 사용할 때 Component를 가져온다.
render()메소드를 사용해서 UI를 작성하면 된다. */
export default class App extends Component {

  state = {
    todoData : [
      {
        id: "1",
        title: "공부하기",
        completed: true
      },
      {
        id: "2",
        title: "청소하기",
        completed: false
      }
    ]
  }

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }


  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  }

  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter((data) => data.id !== id);
    this.setState({ todoData: newTodoData});
  };

  handleChange = (e) => {
    this.setState({value: e.target.value});
  };
  
  handleSubmit = (e) => {
    //form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    //새로운 할일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false
    };

    //원래 있던 할일에 새로운 할일 더하기
    //입력란에 있던 글씨 지워주기
    this.setState({ todoData: [...this.state.todoData, newTodo], value:""});

  };

  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map((data) => {
      if(data.id === id){
        data.completed =!data.completed;
      }
      return data;
    });
    this.setState({todoData: newTodoData});
  };

  render(){
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((data) => (
            <div style={this.getStyle(data.completed)} key={data.id}>
              <p>
              <input type="checkbox" defaultChecked={false} 
                onChange={() => this.handleCompleteChange(data.id)}/>
              {" "}{data.title}
              <button 
                style={this.btnStyle}
                onClick={() => this.handleClick(data.id)}>x</button>
              </p>
            </div>
          ))}

          <form style={{display:'flex'}} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{flex: '10', padding: '5px'}}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value} 
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{flex:'1'}}
            />
          </form>
        </div>
      </div>
    );
  }
}