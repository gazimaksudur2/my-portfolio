const Experience = () => {
    return (
        <div className='py-10 w-[70%] mx-auto'>
            <div className='space-y-2 flex flex-col justify-center items-center text-center'>
                <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-gray-400 text-2xl font-bold'>Experience</h1>
            </div>
            <div className="mt-8">
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


            </div>
        </div>
    );
};

export default Experience;