import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createTodo, getTodo } from "../apis/requests";
import TodoItem from "../components/TodoItem";

export default function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await getTodo();
        console.log(res);
        setTodoList(res);
      } catch (error) {
        console.error("데이터가 불러와지지 않습니다", error);
      }
    };
    fetchTodo();
  }, []);

  const navigate = useNavigate();

  // Token 검증
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  const todoInputHandler = (e) => {
    setNewTodo(e.target.value);
  };

  const addHandler = async (e) => {
    try {
      const res = await createTodo(newTodo);
      setTodoList((prevTodoList) => [...prevTodoList, res]);
      console.log(res);
      setNewTodo("");
    } catch (error) {
      console.error("등록 실패했습니다.", error);
    }
  };

  return (
    <div className="todo-list-container">
      {todoList &&
        todoList.map((data) => (
          <TodoItem
            key={data.id}
            data={data}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        ))}
      {/* 추가 */}
      <div className="add-button-wrapper">
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={todoInputHandler}
          placeholder="할 일을 작성해 주세요"
        />
        <button data-testid="new-todo-add-button" onClick={addHandler}>
          추가
        </button>
      </div>
    </div>
  );
}
