import {Chat} from "../models/Chat";

export const ChatController = {
    'getList': () => {
        Chat.getList();
    },
    'getItem': (id: string) => {
        return {
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
                }
            ]
        };
    },
}