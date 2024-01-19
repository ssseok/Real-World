import HomePage from "@pages/home";
import { Route, Routes } from "react-router-dom";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
    );
}

