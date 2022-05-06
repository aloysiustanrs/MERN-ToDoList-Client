import "./App.css";
import { useState, useEffect } from "react";
const axios = require("axios").default;

function App() {
  const [listOfItems, setListOfItems] = useState([]);

  const [task, setTask] = useState(""); //for onchange of task

  const addItem = () => {
    axios
      .post("https://mern-to-dolist.herokuapp.com/add", { task: task })
      .then((response) => {
        setListOfItems([...listOfItems, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (id) => {
    axios
      .delete(`https://mern-to-dolist.herokuapp.com/delete/${id}`)
      .then(() => {
        setListOfItems(
          listOfItems.filter((item) => {
            return item._id !== id;
          })
        );
      });
  };

  useEffect(() => {
    axios.get("https://mern-to-dolist.herokuapp.com/read").then((response) => {
      setListOfItems(response.data);
    });
  }, []);

  return (
    <>
      <div className="App">
        <div>
          <input
            type="text"
            placeholder="Task"
            onChange={(event) => {
              setTask(event.target.value);
            }}
          ></input>
          <button onClick={addItem}>Add Task</button>
          <hr />
          {listOfItems.map((item) => {
            return (
              <div className="ItemBox">
                <div className="Item">{item.task}</div>
                <button
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
