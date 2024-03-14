import './App.css'
import { axiosTeams } from './components/Teams'
import TeamCard from './components/TeamCard'


function App() {


  return (
    <>
      <h1 className="font-bold">Testing connection with backend</h1>
      <p className="font-bold">Let's get started!</p>
      {/* <TeamCard /> */}
      <button onClick={axiosTeams}>Get Teams</button>
    </>
  )
}

export default App
