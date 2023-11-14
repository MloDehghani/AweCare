import './App.css'
import './Themes/index.scss'
import {createHashRouter,RouterProvider} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import './Themes/index.scss';

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Chat />,
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
  return (
    <>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  )
}

export default App
