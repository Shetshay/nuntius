import "./App.css";
import axios from "axios";
import {useState, useEffect, useRef} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Chatroom from "./pages/Chatroom.jsx";

export default function App() {

    const [newSession, setNewSession] = useState();
    const [sessionName, setSessionName] = useState('');

    
    useEffect(() => {
       console.log("App: the useEffect() session is " + newSession);
    }, []);
    


    return (
        <BrowserRouter>
            <div className="App">         
                <Routes>
                    <Route index element={<Home newSession={newSession} 
                                                setNewSession={setNewSession}/>}/>
                    <Route path="chatroom" element={<Chatroom sessionName={sessionName}
                                                              setSessionName={setSessionName}
                                                              newSession={newSession}
                                                              setNewSession={setNewSession}/>}/>
                </Routes>
            </div>

        </BrowserRouter>  
    )

}