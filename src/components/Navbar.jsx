import { Link } from "react-router-dom";
// import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

const Navbar = () => {
    const navLinks = <>
        <li><Link className={`capitalize text-[#151515bd] hover:border-purple-700 rounded pb-1 lg:pb-2 duration-150 hover:border-b-4 font-semibold lg:text-lg`} to={'#skills'}>skills</Link></li>
        <li><Link className={`capitalize text-[#151515bd] hover:border-purple-700 rounded pb-1 lg:pb-2 duration-150 hover:border-b-4 font-semibold lg:text-lg`} to={'#projects'}>projects</Link></li>
        <li><Link className={`capitalize text-[#151515bd] hover:border-purple-700 rounded pb-1 lg:pb-2 duration-150 hover:border-b-4 font-semibold lg:text-lg`} to={'#education'}>education</Link></li>
        <li><Link className={`capitalize text-[#151515bd] hover:border-purple-700 rounded pb-1 lg:pb-2 duration-150 hover:border-b-4 font-semibold lg:text-lg`} to={'#experience'}>experience</Link></li>
        <li><Link className={`capitalize text-[#151515bd] hover:border-purple-700 rounded pb-1 lg:pb-2 duration-150 hover:border-b-4 font-semibold lg:text-lg`} to={'#aboutme'}>about me</Link></li>
        {/* <li><HashLink className={"capitalize"} to={'#aboutme'}>about me</HashLink></li> */}
    </>
    return (
        <div id="top" className='w-[93%] mx-auto mt-5 '>
            <div className="navbar bg-base-100">
                <Link className="flex-1 gap-1 lg:gap-2 cursor-pointer" to={'/'}>
                    <img className="h-7 w-6 lg:w-8 lg:h-10" src="https://cdn-icons-png.flaticon.com/128/351/351456.png" alt="web logo" />
                    <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-gray-400 lg:text-2xl font-bold">{"Gazi's Portfolio"}</h3>
                </Link>
                <div className="flex-none hidden lg:flex">
                    <ul className="flex px-1 gap-8">
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
                            className="dropdown-content lg:hidden bg-base-300 rounded-box z-[1] mt-3 w-32 p-4 shadow space-y-2 gap-2">
                            {navLinks}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;