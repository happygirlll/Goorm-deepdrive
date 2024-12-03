//rfc를 입력하면 함수형 컴포넌트가 자동 생성된다.
//extensions에서 es7다운받기

import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from './List';  // List.js를 import


export default function Lists({todoData, setTodoData}) {

    const handleEnd = (result) => {
        if (!result.destination) {
          return;
        }
        const newTodoData = Array.from(todoData); // 새로운 배열 생성
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);
        newTodoData.splice(result.destination.index, 0, reorderedItem);
      
        setTodoData(newTodoData); // 새로운 배열로 상태 업데이트
      };
      

return (
    <div>
        <DragDropContext onDragEnd={handleEnd}>
            <Droppable droppableId="to-do">
                {(provided) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef} // Droppable의 ref를 올바르게 전달
                    >
                    {todoData.map((data, index) => (
                        <Draggable
                        key={data.id}
                        draggableId={data.id.toString()}
                        index={index}
                        >
                        {(provided, snapshot) => (
                            <List
                            id={data.id}
                            title={data.title}
                            completed={data.completed}
                            todoData={todoData}
                            setTodoData={setTodoData}
                            provided={provided} // Draggable의 provided 전달
                            snapshot={snapshot} // Draggable의 snapshot 전달
                            />
                        )}
            </Draggable>
            ))}
            {provided.placeholder}
            </div>
        )}
        </Droppable>
    </DragDropContext>
    </div>
);
}
