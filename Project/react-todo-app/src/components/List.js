import React from 'react';

const List = React.memo(({
    id,
    title,
    completed, 
    setTodoData, 
    todoData, 
    provided, 
    snapshot,
    handleClick
}) => {
    console.log("Lists Component");
    const handleCompleteChange = (id) => {
        const newTodoData = todoData.map((data) => ({
          ...data, // 객체 복사
          completed: data.id === id ? !data.completed : data.completed,
        }));
        setTodoData(newTodoData); // 새로운 배열로 업데이트
      };
      

      
    
    return (
        <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef} // provided.innerRef 전달
        {...provided.dragHandleProps}
        className={`${
        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
    >
      
                            <div className="items-center">
                                <input
                                type="checkbox"
                                onChange={() => handleCompleteChange(id)}
                                defaultChecked={completed}
                                />
                                <span className={completed ? "line-through" : undefined}>
                                {title}
                                </span>
                            </div>
                            <div className="items-center">
                                <button
                                className="px-4 py-2 float-right"
                                onClick={() => handleClick(id)}
                                >
                                x
                                </button>
                            </div>
                            </div>
    )
});

export default List
