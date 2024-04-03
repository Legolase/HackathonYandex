import React, {useState} from "react";
import './/styles/App.css'
import LeftPanel from "./components/LeftPanel/LeftPanel";
import CurrentChat from "./components/CurrentChat/CurrentChat";
import InputMessage from "./components/InputMessage/InputMessage";
import Messages from "./components/Messages/Messages";

function App() {


    const url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg"

    const [chats, setChats] = useState([
        {
            "id": 1,
            "name": "chat_name 1",
            "avatar": url,
            "last_message": {
                "id": 1,
                "text": "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:35:40.742Z",
                "from": 1,
                "read": true
            }
        },
        {
            "id": 2,
            "name": "chat_name 2",
            "avatar": url,
            "last_message": {
                "id": 1,
                "text": "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:35:40.742Z",
                "from": 1,
                "read": true
            }
        },
        {
            "id": 3,
            "name": "chat_name 3",
            "avatar": url,
            "last_message": {
                "id": 1,
                "text": "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:35:40.742Z",
                "from": 1,
                "read": true
            }
        }
    ])


    const [messages, setMessages] = useState({
        "id": 1,
        "name": "chat_name 1",
        "avatar": "/storage/avatar.jpg",
        "messages": [
            {
                "id": 1,
                "text": "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:00:40.742Z",
                "from": 1,
                "read": true
            },
            {
                "id": 2,
                "text": "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:05:40.742Z",
                "from": 2,
                "read": true
            },
            {
                "id": 3,
                "text": "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:10:40.742Z",
                "from": 1,
                "read": true
            },
            {
                "id": 4,
                "text": "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:15:40.742Z",
                "from": 2,
                "read": true
            },
            {
                "id": 4,
                "text": "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:15:40.742Z",
                "from": 2,
                "read": true
            },
            {
                "id": 4,
                "text": "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                "datetime": "2024-03-30T08:15:40.742Z",
                "from": 2,
                "read": true
            }
        ]
    })


    return (
        <div className="App">
            <LeftPanel chats={chats}/>
            <div className={'right-panel'} style={{width: '100%', display: "flex", flexDirection: 'column', gap: '10px'}}>
                <CurrentChat chats={chats}/>
                <Messages />
                <InputMessage/>
            </div>
        </div>
    );
}

export default App;
