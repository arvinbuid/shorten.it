import { BrowserRouter as Router } from "react-router-dom"
import { getApps } from "./components/utils/helper"

function App() {
  const CurrentApp = getApps();
  return (
    <>
      <Router>
        <CurrentApp />
      </Router>
    </>
  )
}

export default App