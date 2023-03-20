import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
}from "react-router-dom";
import SeriesList from './components/SeriesList';
import Series from './components/Series';
import CharacterList from './components/CharacterList';
import ComicsList from './components/ComicsList';
import Character from './components/Character';
import Comic from './components/Comic';
import StarwarsPeople from './components/StarwarsPeople'
import StarwarsPlanets from './components/StarwarsPlanets'
import StarwarsShips from './components/StarwarsShips'

import logo from './img/logo.png';
import './App.css';
import Error from './components/Error';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <div className='nav-div'>
          <t className = "show"> MARVEL:</t>
          <NavLink className={({ isActive }) =>(isActive ? " showlinkactive" : "showlink")} to='/characters/page/0'>
              Characters
            </NavLink>
          <NavLink className={({ isActive }) =>(isActive ? " showlinkactive" : "showlink")} to='/comics/page/0'>
              Comics
          </NavLink>
          <NavLink className={({ isActive }) =>(isActive ? " showlinkactive" : "showlink")} to='/series/page/0'>
              Series
          </NavLink>
          <t></t>
          <t className = "show">STARWARS:</t>
          <NavLink className={({ isActive }) =>(isActive ? " showlinkactive" : "showlink")} to='/people/page/1'>
              People
          </NavLink>
          <NavLink className={({ isActive }) =>(isActive ? " showlinkactive" : "showlink")} to='/planets/page/1'>
              Plantets
          </NavLink>
          <NavLink className={({ isActive }) =>(isActive ? " showlinkactive" : "showlink")} to='/starships/page/1'>
              Starships
          </NavLink>

          </div>
        </header>          
        
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<h1 className='App-title'>
             This website provides you with the power to search your favorite Marvel and Starwars
        world information. Let the superhero nerd
        inside you go nuts!!!
          </h1>}/>
            <Route path = '/characters/page/:pagenum' element = {<CharacterList />} />
            <Route path = '/characters/:id' element = {<Character/>} />
            <Route path = '/comics/page/:pagenum' element = {<ComicsList />} />
            <Route path = '/comics/:id' element = {<Comic/>} />
            <Route path = '/series/page/:pagenum' element = {<SeriesList />} />
            <Route path = '/series/:id' element = {<Series/>} />
            <Route path = '/people/page/:pagenum' element = {<StarwarsPeople/>} />     
            <Route path = '/planets/page/:pagenum' element = {<StarwarsPlanets/>} />  
            <Route path = '/starships/page/:pagenum' element = {<StarwarsShips/>} />      
            <Route path = '/error' element ={<Error/>} />
            <Route path = '*' element ={<Error/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
