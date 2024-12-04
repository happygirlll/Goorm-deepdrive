import React, {useState, useCallback} from "react";
import "./App.css";
import Form from "./components/Form";  // Form.js를 import
import Lists from "./components/Lists"; 


// 컴포넌트 바꿈
export default function App() {
  console.log("App Component");
  const [todoData, setTodoData] = useState([
    {
      id: "1",
      title: "공부하기",
      completed: true,
    },
    {
      id: "2",
      title: "밥먹기",
      completed: false,
    },
  ]);

  const [value, setValue] = useState("");
  
  const handleClick = useCallback((id) => {
    const newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData); // 새로운 배열로 업데이트
  }, [todoData]);

  const handleSubmit = (e) => {
    //form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    //새로운 할일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };

    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  //렌더 메소드 삭제
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
        <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between mb-3">
            <h1>할 일 목록</h1>
          </div>

          <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>
          <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
          
        </div>
      </div>
    );
  
}