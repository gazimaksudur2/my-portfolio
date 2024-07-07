import { NavLink } from "react-router-dom";

const Navbar = () => {
    const navLinks = <>
        <li><NavLink className={"capitalize"} to={'#skills'}>skills</NavLink></li>
        <li><NavLink className={"capitalize"} to={'#projects'}>projects</NavLink></li>
        <li><NavLink className={"capitalize"} to={'#education'}>education</NavLink></li>
        <li><NavLink className={"capitalize"} to={'#experience'}>experience</NavLink></li>
        <li><NavLink className={"capitalize"} to={'#aboutme'}>about me</NavLink></li>
    </>
    return (
        <div className='w-[93%] mx-auto mt-5 '>
            <div className="navbar bg-base-100">
                <div className="flex-1 gap-2">
                    <img className="w-8 h-10" src="https://cdn-icons-png.flaticon.com/128/351/351456.png" alt="web logo" />
                    <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-gray-400 text-2xl font-bold">{"Gazi's Portfolio"}</h3>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ml-6">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://i.ibb.co/nk2X4F0/selfie-png.png" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2">
                            {navLinks}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;