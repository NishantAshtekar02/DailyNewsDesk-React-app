import './App.css';
import React, { useState } from 'react'
import Navbar from './components/navbar';
import News from './components/news';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {

  const [progress, setProgress] = useState(0)
 
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
        <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} key="general" pagesize={6} country='in' category='general' />}/>
            <Route exact path="/business" element={<News setProgress={setProgress} key="business" pagesize={6} country='in' category='business' />}/>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pagesize={6} country='in' category='entertainment' />}/>
            <Route exact path="/health" element={<News setProgress={setProgress} key="health" pagesize={6} country='in' category='health' />}/>
            <Route exact path="/science" element={<News setProgress={setProgress} key="science" pagesize={6} country='in' category='science' />}/>
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pagesize={6} country='in' category='sports' />}/>
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pagesize={6} country='in' category='technology' />}/>
        </Routes>
        </BrowserRouter>
      </div>
    )
 
}

export default App;

