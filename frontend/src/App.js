import React, {useEffect} from "react";
import './/styles/App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useLoggedInUserStore} from "./store/LoggedInUserStore";
import Messenger from "./pages/Messenger";
import Auth from "./pages/Auth";
import FOFError from "./pages/FOFError";

function App() {

    const {currentUser, getCurrentUser, loading} = useLoggedInUserStore()

    useEffect(() => {
        getCurrentUser()
    }, []);

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
                {fofErr}
                <Route path={'*'} element={<Navigate replace to='/auth'/>}/>
            </Routes>
        </BrowserRouter>
    );


}

export default App;
