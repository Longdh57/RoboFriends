import React, {useState, useEffect} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import './App.css';
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

function App() {
    const [robots, setRobots] = useState([])
    const [searchField, setsearchField] = useState('')
    const [count, setCount] = useState(0)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        sleep(500)
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json()
        }).then(users => {
            setRobots(users)
        })
        console.log(count)
    }, [count])

    const onSearchChange = (event) => {
        setsearchField(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return !robots.length ?
    (
        <div className={'tc'}>
            <h1 className={'f1'}>Loading...</h1>
        </div>
    ):
    (
        <div className={'tc'}>
            <h1 className={'f1'}>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <button onClick={()=>setCount(count+1)}>Click MEeeeeeee</button>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    )
}

export default App;
