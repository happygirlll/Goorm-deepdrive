//rfc를 입력하면 함수형 컴포넌트가 자동 생성된다.
//extensions에서 es7다운받기

import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from './List';  // List.js를 import

//rafc로 만든 Lists Component
const Lists = React.memo( ({todoData, setTodoData, handleClick}) => {
    console.log("Lists Component");
    
    const handleEnd = (result) => {
        if (!result.destination) {
            return;
        }
        // 1. 변경시키는 아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 잡아준다.
        const newTodoData = Array.from(todoData); // 새로운 배열 생성
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);
        
        // 원하는 자리에 reorderItem을 insert 해준다.
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
                            handleClick={handleClick} 
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
)
});

export default Lists

