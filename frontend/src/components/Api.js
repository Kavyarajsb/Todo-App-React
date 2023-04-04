import axios from 'axios'
import config from "../services/config.json"


const getAllToDo = async (setToDo) => {
      await axios.get(`${config.api_base_url}/todos`)
      .then(({ data }) => {
        console.log('data', data);
        setToDo(data)
    })
    .catch((err) => console.log(err))
  };
  
  const addToDo = async (text, setText, setToDo) => {
      const data = { text };
      await axios.post(`${config.api_base_url}/todo`, data)
      .then((data) => {
        console.log(data);
        setText("")
        getAllToDo(setToDo)
    })
    .catch((err) => console.log(err))
  };
  
  const updateToDo = async (toDoId, text, setToDo, setText, setIsUpdating) => {
    try {
        const data = { _id: toDoId, text };
        await axios.put(`${config.api_base_url}/todo/${toDoId}`, data);
        console.log(data);
        setText("");
        setIsUpdating(false);
        getAllToDo(setToDo);
      } catch (err) {
        console.log(err);
      }
  };
  
  const deleteToDo = async (_id, setToDo) => {
    try {
        const response = await axios.delete(`${config.api_base_url}/todo/${_id}`);
        console.log(response);
        getAllToDo(setToDo);
      } catch (err) {
        console.log(err);
      }

  };
  
export { getAllToDo, addToDo, updateToDo, deleteToDo }