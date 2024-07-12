import { FaArrowUp } from "react-icons/fa6";
import { Link, ScrollRestoration } from "react-router-dom";

const Experience = () => {
    return (
        <div id="experience" className='py-10 w-[80%] mx-auto'>
            <ScrollRestoration />
            <div className='space-y-2 flex flex-col justify-center items-center text-center'>
                <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-gray-400 text-2xl font-bold'>Experience</h1>
                <p className="text-sm text-[#151515ab]">{"While I have not yet had the opportunity to gain professional experience, I have dedicated a significant amount of time to learning new technologies and mastering fundamental concepts. As a result, my experience primarily consists of extensive self-driven learning and practical projects. "}</p>
            </div>
            <div className="grid lg:grid-cols-2 mt-8 gap-10">
                <div className="p-4 bg-purple-200 border-2 border-purple-700 rounded-2xl">
                    <h2 className="text-xl font-semibold text-[#151515bd]">2022 - Present</h2>
                    <h1 className="text-2xl font-black text-[#151515db]">Learning CSE Fundamentals</h1>
                    <h4 className="font-medium text-[#151515ab]">Shahjalal University of Science and Technology</h4>
                    <p className="mt-3 text-sm text-[#151515a0]">{"As a third-year Computer Science student at university, I'm focused on mastering data structures, algorithms, and foundational CSE concepts, deeply immersing myself in the core principles of the field."}</p>
                </div>
                <div className="p-4 bg-purple-200 border-2 border-purple-700 rounded-2xl">
                    <h2 className="text-xl font-semibold text-[#151515bd]">2023 - 2024</h2>
                    <h1 className="text-2xl font-black text-[#151515db]">Learning MERN Stack Development</h1>
                    <h4 className="font-medium text-[#151515ab]">Programming Hero</h4>
                    <p className="mt-3 text-sm text-[#151515a0]">{"Over the past year, I've delved into web development, exploring various technologies and frameworks, and continuously enhancing my skills to build dynamic, responsive, and user-friendly web applications."}</p>
                </div>
            </div>
            {/* <div className="mt-8">
                <ol className="relative border-s border-gray-500">
                    <li className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400">February 2022</time>
                        <h3 className="text-lg font-semibold text-gray-900">Application UI code in Tailwind CSS</h3>
                        <p className="mb-4 text-base font-normal text-gray-500">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg></a>
                    </li>
                    <li className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400">March 2022</time>
                        <h3 className="text-lg font-semibold text-gray-900">Marketing UI design in Figma</h3>
                        <p className="text-base font-normal text-gray-500">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
                    </li>
                    <li className="ms-4">
                        <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400">April 2022</time>
                        <h3 className="text-lg font-semibold text-gray-900">E-Commerce UI code in Tailwind CSS</h3>
                        <p className="text-base font-normal text-gray-500">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
                    </li>
                </ol>


            </div> */}
            <Link to={'#education'} className="absolute right-20 border-2 p-2 hidden lg:flex rounded-full text-purple-600 border-purple-600 cursor-pointer active:scale-95">
                <FaArrowUp className="" size={22} />
            </Link>
        </div>
    );
};

export default Experience;