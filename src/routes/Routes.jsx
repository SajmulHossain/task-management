
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivetRoute from './PrivetRoute';
import Todo from '../component/Todo';
import AddTask from '../pages/AddTask/AddTask';
import UpdateTask from '../pages/UpdateTask';

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivetRoute>
        <App />
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        element: <Todo />
      }, 
      {
        path: '/add-task',
        element: <AddTask />
      },
      {
        path: '/task/update/:id',
        element: <UpdateTask />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default routes;