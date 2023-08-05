import { useState } from "react";
import { updateTodo, deleteTodo } from "../apis/requests";

export default function TodoItem(props) {
  const { data, todoList, setTodoList } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(data.todo);

  const updateComplete = async (e, data) => {
    console.log(e.target);
    const isCompleted = e.target.checked;
    try {
      const res = await updateTodo(data.todo, isCompleted, data.id);
      const index = todoList.findIndex((todo) => todo.id === res.id);
      setTodoList((prevTodoList) => {
        const updatedList = [...prevTodoList];
        updatedList[index] = res;
        return updatedList;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setUpdateStatus = () => {
    setIsUpdating(!isUpdating);
  };

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      await deleteTodo(id);
      const index = todoList.findIndex((todo) => todo.id === id);
      setTodoList((prevTodoList) => {
        const updatedList = [...prevTodoList];
        updatedList.splice(index, 1);
        return updatedList;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 수정 관련
  const updateInputHandler = (e) => {
    setUpdatedTodo(e.target.value);
  };

  const updateCancleHandler = () => {
    setUpdatedTodo(data.todo);
    setIsUpdating(!isUpdating);
  };

  const updateTodoHandler = async (data) => {
    console.log("수정");
    try {
      const res = await updateTodo(updatedTodo, data.isCompleted, data.id);
      const index = todoList.findIndex((todo) => todo.id === res.id);
      setTodoList((prevTodoList) => {
        const updatedList = [...prevTodoList];
        updatedList[index] = res;
        return updatedList;
      });
      setIsUpdating(!isUpdating);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo-item-component-container">
      {!isUpdating ? (
        <>
          <label>
            <input
              type="checkbox"
              checked={data.isCompleted}
              onChange={(e) => updateComplete(e, data)}
            />
            <span>{data.todo}</span>
          </label>
          <div>
            <button data-testid="modify-button" onClick={setUpdateStatus}>
              수정
            </button>
            <button
              className="delete-button"
              data-testid="delete-button"
              onClick={() => deleteHandler(data.id)}
            >
              삭제
            </button>
          </div>
        </>
      ) : (
        // 수정
        <>
          <label>
            <input
              type="checkbox"
              checked={data.isCompleted}
              onChange={(e) => updateComplete(e, data)}
            />
            <input
              data-testid="modify-input"
              value={updatedTodo}
              onChange={updateInputHandler}
            />
          </label>
          <div>
            <button
              data-testid="submit-button"
              onClick={() => updateTodoHandler(data)}
            >
              제출
            </button>
            <button data-testid="cancel-button" onClick={updateCancleHandler}>
              취소
            </button>
          </div>
        </>
      )}
    </div>
  );
}
