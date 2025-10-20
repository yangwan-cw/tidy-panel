
import Info from '@renderer/components/Info'
import Search from '@renderer/components/Search'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App(): JSX.Element {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
      {/* <Info /> */}
      {/* <div
        id="titlebar"

        style={{
          height: '50px',
          backgroundColor: '#2c3e50',
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
          color: 'white',
          fontWeight: 'bold',
          userSelect: 'none'
        }}
      >
        📌 Drag this bar to move the window
      </div>
      <div style={{ padding: '20px' }}>
        <h1>Main Content</h1>
        <p>You can interact with elements here normally:</p>
        <button onClick={() => alert('Button works!')}>
          Click Me
        </button>
        <input type="text" placeholder="Type here..." style={{ marginLeft: '10px' }} />
      </div> */}
    </>
  )
}

export default App
