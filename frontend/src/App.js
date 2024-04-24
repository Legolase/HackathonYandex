import React, {useEffect} from "react";
import './/styles/App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useLoggedInUserStore} from "./store/LoggedInUserStore";
import Messenger from "./pages/Messenger";
import Auth from "./pages/Auth";
import FOFError from "./pages/FOFError";
import {useRightPanelStore} from "./store/RightPanelStore";
import UserProfile from "./components/UserProfile/UserProfile";
import SelectedChat from "./components/RightSide/SelectedChat/SelectedChat";
import UnSelected from "./components/RightSide/UnSelected/UnSelected";

function App() {

    const {currentUser, getCurrentUser, loading} = useLoggedInUserStore()

    useEffect(() => {
        getCurrentUser()
    }, []);


    // const active = useRightPanelStore(state => state.active)
    //
    // let activePanel;
    // switch (active) {
    //     case 'Contact':
    //         activePanel = <UserProfile/>
    //         break
    //     case 'Messages':
    //         activePanel = <SelectedChat/>
    //         break
    //     default:
    //         activePanel = <UnSelected/>
    // }


    // todo: Хотим показывать auth только если юзер не вошел, иначе не хотим
    const baseRoutes = (
        <>
            <Route path={'/auth'} element={<Auth/>}/>
        </>
    );

    const fofErr = (
        <>
            <Route path={'/foferr'} element={<FOFError/>}/>
        </>
    );

    const privateRoutes = currentUser ? (
        <>
            <Route index={true} element={<Messenger activePanel={<UnSelected/>}/>}/>
            <Route exact path={'/chat/:id'} element={<Messenger activePanel={<SelectedChat/>}/>}/>
            <Route exact path={'/user/:id'}
                   element={
                       <Messenger activePanel={<UserProfile/>}/>
                   }
            />

        </>
    ) : <></>;


    if (loading)
        return (<span>LOADING</span>);

    return (
        <BrowserRouter>
            <Routes>
                {baseRoutes}
                {privateRoutes}
                {fofErr}
                <Route path={'*'} element={<Navigate replace to='/auth'/>}/>
            </Routes>
        </BrowserRouter>
    );


}

export default App;
