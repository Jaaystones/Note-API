import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/editUser'
import editNote from './features/notes/editNote'
import NewUserForm from './features/users/newUserForm'
import newNote from './features/notes/newNote'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path=":id" element={<editNote />} />
            <Route path="new" element={<newNote />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes> 
  );
}

export default App;
