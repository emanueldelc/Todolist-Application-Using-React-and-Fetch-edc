import React, { useState, useEffect } from "react";
import {fetchTodos, deleteTaskAPI, createUser, deleteAllTasksinAPI, addTaskToAPI} from "../updateAPI";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [userInput, setUserInput] = useState("")
	const [todo, setTodos] = useState([])

	useEffect(() => {
		fetchTodos(setTodos);
	})
	const addToDo = (e) => {
		if ((e.key === "Enter" || e === "click") && userInput.trim() !== "" ) {

			let thisToDo = { label: userInput.trim(), is_done: false }
			addTaskToAPI(thisToDo, setTodos)
			setUserInput("")
		}

	}
	const deleteTodo = (i) => {
		const todoId = todo[i].id;
		deleteTaskAPI(todoId, setTodos)
	}
	const handleCreateUser = () => {
		createUser();
	}
	const handleClearTasks = () => {
		setTodos([]);
		deleteAllTasksinAPI(setTodos);
	}
	return (
		<div className="text-center container">
			<h1 className="text-center">To-do's</h1>
			<div className="card mx-auto mt-2" style={{ maxWidth: "800px" }}>

				<ul className="list-group list-group-flush">
					<li className="list-group-item d-flex align-items-center justify-content-center">
						<input type="text" onChange={(e) => setUserInput(e.target.value)} value={userInput} onKeyDown={addToDo} />
						<button className="btn btn-dark btn-sm ms-2" onClick={() => addToDo("click")}>add to to-do list</button>
					</li>
					{todo.length === 0 ? (
						<li className="list-group-item">
							No task, add a task
						</li>
					) : (
						todo.map((todo, index) => (
							<li className="list-group-item" key={todo.id}>
								<div className="list-group-item-todo" id="screen">{todo.label}</div>
								<span className="x-container" onClick={() => deleteTodo(index)}>
									<i className="fa-solid fa-x"></i>
								</span>
							</li>
						))
					)

					}
				</ul>
				<div className="card-footer text-secondary">
					{todo.length} {todo.length === 1?"item" : "items"} left
				</div>
			</div>
			<div className="btn-div my-4">
					<button className="btn btn-primary me-2" onClick={handleCreateUser}>Create User to Save Tasks</button>
					<button className="btn btn-danger me-2" onClick={handleClearTasks}>Clear User and all Tasks</button>
			</div>

		</div>
	);
};

export default Home;