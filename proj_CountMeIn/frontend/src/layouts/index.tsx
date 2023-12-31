import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";


const CleanLayout = () => (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
);

export default CleanLayout;