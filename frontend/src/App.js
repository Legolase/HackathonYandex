import React, {useEffect} from "react";
import './/styles/App.css';
import 'react-photo-view/dist/react-photo-view.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useLoggedInUserStore} from "./store/LoggedInUserStore";
import Messenger from "./pages/Messenger";
import Auth from "./pages/Auth";
import UserProfile from "./components/UserProfile/UserProfile";
import SelectedChat from "./components/RightSide/SelectedChat/SelectedChat";
import UnSelected from "./components/RightSide/UnSelected/UnSelected";
import Error404 from "./pages/Error404";
import Settings from "./components/Settings/Settings";
import Invite from "./components/Invite/Invite";

function App() {

    const {currentUser, getCurrentUser, loading} = useLoggedInUserStore()

    useEffect(() => {
        getCurrentUser()
    }, []);


    const baseRoutes = (
        <>
            {
                currentUser ? <></> :
                    <>
                        {/*<Route index={true} element={<Auth/>}/>*/}
                        <Route path={'/auth'} element={<Auth/>}/>
                        <Route exact path={'/*'} element={<Navigate to={'/auth'}/>}/>
                    </>
            }

        </>
    );

    const privateRoutes = currentUser ? (
        <>
            <Route index={true}
                   element={<Messenger activePanel={<UnSelected/>}/>}
            />
            <Route exact path={'/chat/:chatId'}
                   element={<Messenger activePanel={<SelectedChat/>}/>}
            />
            <Route exact path={'/user/:contactId'}
                   element={<Messenger activePanel={<UserProfile/>}/>}
            />
            <Route exact path={'/chat/invite/:chatId'}
                   element={<Messenger activePanel={<Invite/>}/>}
            />
            <Route exact path={'/settings'}
                   element={<Messenger activePanel={<Settings/>}/>}
            />
            <Route exact path={'/*'}
                   element={<Error404/>}
            />
        </>
    ) : <></>;


    if (loading)
        return <div style={{width: '100%'}}></div>;

    return (
        <BrowserRouter>
            <Routes>
                {baseRoutes}
                {privateRoutes}
            </Routes>
        </BrowserRouter>
    );


}

export default App;
