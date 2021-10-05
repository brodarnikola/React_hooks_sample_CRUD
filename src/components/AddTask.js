import { useState } from 'react';
import { Link } from 'react-router-dom';
import ExampleSortableTreeFunctionComponent from './ExampleSortableTreeFunctionComponent';

const AddTask = () => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Plase add a task');
      return;
    }

    addTask({ text, day, reminder });

    setText('');
    setDay('');
    setReminder(false);
  };

  //add task
  const addTask = async (task) => {
    console.log('task: ' + task.text + ' day: ' + task.day);
    await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    changeRoute('/');
  };

  const changeRoute = (newRoute) => (window.location.href = newRoute);

  return (
    <div>
      <form className="add-form" onSubmit={onSubmit}>
        <Link to="/">GO BACK</Link>
        <div className="form-control">
          <label>Task</label>
          <input
            type="text"
            placeholder="Add task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
        </div>
        <div className="form-control">
          <label>Day and time</label>
          <input
            type="text"
            placeholder="Add a day and time"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          ></input>
        </div>
        <div className="form-control form-control-check">
          <label>Set reminder</label>
          <input
            type="checkbox"
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>
        <input type="submit" className="btn btn-block" value="Save task" />
      </form>
      <ExampleSortableTreeFunctionComponent />
    </div>
  );
};

export default AddTask;
