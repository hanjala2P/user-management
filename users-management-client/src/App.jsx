
import './App.css';
import Users from './Components/users';

const usersPromise =fetch('http://localhost:5000/users').then(res=>res.json());

function App() {

  return (
    <>
    <div>
      <h1>users management</h1>
      <Users usersPromise={usersPromise}></Users>
    </div>
    </>
  )
}

export default App
