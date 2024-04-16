import React, {useEffect} from "react";
import './/styles/App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useCurrentUserStore} from "./store/CurrentUserStore";
import Messenger from "./pages/Messenger";
import Auth from "./pages/Auth";

function App() {

    const {currentUser, getCurrentUser, loading} = useCurrentUserStore()

    useEffect(() => {
        getCurrentUser()
    }, []);

    const baseRoutes = (
        <>
            <Route path={'/auth'} element={<Auth/>}/>
        </>
    );

    let privateRoutes = currentUser ? (
        <>
            <Route index={true} element={<Messenger/>}/>
        </>
    ) : <></>;


    if (loading)
        return (<span>LOADING</span>);

    return (
        <BrowserRouter>
            <Routes>
                {baseRoutes}
                {privateRoutes}
                <Route path={'*'} element={<Navigate replace to='/auth'/>}/>
            </Routes>
        </BrowserRouter>
    );


}

export default App;
