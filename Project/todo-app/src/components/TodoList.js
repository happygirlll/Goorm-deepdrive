import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList({ todos, setTodos, updateTodo, deleteTodo, toggleComplete, toggleEditing }) {
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((todo, index) => (
                            <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TodoItem
                                            todo={todo}
                                            updateTodo={updateTodo}
                                            deleteTodo={deleteTodo}
                                            toggleComplete={toggleComplete}
                                            toggleEditing={toggleEditing}
                                            isDragging={snapshot.isDragging} // 드래그 상태 전달
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default TodoList;
