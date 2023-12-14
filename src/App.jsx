import './App.css';
import Login from './routes/Login.jsx'
import Home from './routes/Home.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import RequireAuth from './components/RequireAuth.jsx';
import SignUp from './routes/SignUp.jsx';
import Page404 from './routes/Page404.jsx';
import Layout from './routes/Layout.jsx';
import Notes from './routes/Notes.jsx';
import Note from './routes/Note.jsx';
import NewNote from './routes/NewNote.jsx';
import EditNote from './routes/EditNote.jsx';
import { Provider } from 'react-redux';
import store, { persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react'

//в качестве примера создан один пользователь (email: a@gmail.com, password: aA123456)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: '/notes',
        element: (
          <RequireAuth>
            <Notes />
          </RequireAuth>
        )
      },
      {
        path: '/newnote',
        element: (
          <RequireAuth>
            <NewNote />
          </RequireAuth>
        ),
      },
      {
        path: '/note',
        element: (
          <RequireAuth>
            <Note />
          </RequireAuth>
        ),
      },
      {
        path: '/editnote',
        element: (
          <RequireAuth>
            <EditNote />
          </RequireAuth>
        ),
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/*',
    element: <Page404 />,
  },
  {
    path: '/signup',
    element: <SignUp />
  },
])

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}

export default App