import { useEffect, useState } from 'react';
import Project from './Project';
import { Link, ScrollRestoration } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa6';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    // const heading = "Our Valued projectss";
    // const subHeading = "Meet our valued projectss whose generous support across various levels—Platinum, Gold, Silver, Bronze, and Community—drives our mission and success, enabling us to achieve our goals and initiatives";

    useEffect(() => {
        fetch('projects.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProjects(data);
            })
    }, [])
    return (
        <div id='projects' className='relative w-[90%] lg:w-[80%] mx-auto py-4 lg:py-10 flex flex-col justify-center items-start'>
            <ScrollRestoration />
            <h1 className='px-2 text-start bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-gray-400 text-2xl lg:text-3xl font-bold'>Recent projects</h1>
            {
                projects && <>
                    <div className="mt-4 p-5 rounded-2xl bg-base-200 border-2 border-purple-400 flex flex-col-reverse lg:flex-row items-center justify-between">
                        <div className='lg:w-[50%]'>
                            <h3 className='text-purple-500'>{projects[0]?.projectType}</h3>
                            <h1 className='text-[#151515bb] text-2xl font-bold'>{projects[0]?.projectTitle}</h1>
                            <p className='text-[#151515bb] py-4 text-sm'>{projects[0]?.projectDescription}</p>
                            {/* <h2 className='mt-2 text-xl font-semibold text-[#151515cb]'>Project Overview</h2> */}
                            <ul className='flex items-center justify-start gap-3 flex-wrap'>
                                {
                                    projects[0]?.skills.map((skill, idx) => <>
                                        <li key={idx} className='bg-gradient-to-r from-[#151515db] to-[#15151580] px-3 py-1 rounded-full text-white font-semibold'>{skill}</li>
                                    </>)
                                }
                            </ul>
                            <div className='mt-4 text-sm flex justify-start items-center gap-4'>
                                <a className='text-purple-500 hover:underline cursor-pointer' href={projects[0]?.liveSiteLink}>Live site</a>
                                <a className='text-purple-500 hover:underline cursor-pointer' href={projects[0]?.githubClientRepoLink}>Github Client Repo</a>
                                {
                                    projects[0]?.githubServerRepoLink && <a className='text-purple-500 hover:underline cursor-pointer' href={projects[0]?.githubServerRepoLink}>Github Server Repo</a>
                                }
                            </div>
                            <div className='mt-4'>
                                <h4 className='text-[#151515ab] font-semibold'>Exciting Features</h4>
                                <ul className='list-disc pl-6 py-2 mt-2 bg-white rounded-xl'>
                                    {
                                        projects[0]?.features.map((skill, idx) => <>
                                            <li key={idx} className='font-medium'>{skill}</li>
                                        </>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='lg:w-[45%] bg-gray-800 p-4 rounded-xl'>
                            <img className="w-[500px] max-h-[500px] object-cover" src={projects[0]?.bannerImgUrl} alt="banner image" />
                        </div>
                    </div>
                </>
            }
            <div className='mx-auto mt-3 grid grid-cols-1 lg:grid-cols-2 gap-7'>
                {
                    projects && projects.slice(1, 3).map((each, idx) => <>
                        <Project project={each} key={idx} />
                    </>)
                }
            </div>
            <div className='w-full flex justify-center items-center pt-7'>
                {/* <button className='btn btn-outline'>View All Projects</button> */}
                <Link to={'#skills'} className="absolute bottom-10 -right-16 border-2 p-2 hidden lg:flex rounded-full text-purple-600 border-purple-600 cursor-pointer active:scale-95">
                    <FaArrowUp className="" size={22} />
                </Link>
            </div>
        </div>
    );
};

export default Projects;