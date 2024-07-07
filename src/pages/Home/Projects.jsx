import { useEffect, useState } from 'react';
import Project from './Project';

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
        <div className='w-[80%] mx-auto py-10 flex flex-col justify-center items-center'>
            <h1 className='w-full bg-clip-text px-2 text-start text-transparent bg-gradient-to-r from-purple-800 to-black text-3xl font-bold'>Recent projects</h1>
            {
                projects && <>
                    <div className="mt-4 p-5 rounded-2xl bg-base-200 border-2 border-gray-400 flex items-center justify-between">
                        <div className='w-[50%]'>
                            <h3>{projects[0]?.projectType}</h3>
                            <h1>{projects[0]?.projectTitle}</h1>
                            <p>{projects[0]?.projectDescription}</p>
                            <ul className='flex items-center justify-start gap-3'>
                                {
                                    projects[0]?.skills.map((skill, idx) => <>
                                        <li key={idx} className='bg-purple-700 px-3 py-1 rounded-full text-white font-semibold'>{skill}</li>
                                    </>)
                                }
                            </ul>
                            <h2>Project Overview</h2>
                            <div>
                                <p>Live site: <span>{projects[0]?.liveSiteLink}</span></p>
                                <p>Github Client Repo: <span></span></p>
                                <p>Github Server Repo: <span></span></p>
                                <h4>Exciting Features</h4>
                                <ul className='list-disc pl-6 py-2 mt-2 bg-white rounded-xl'>
                                    {
                                        projects[0]?.features.map((skill, idx) => <>
                                            <li key={idx} className='font-medium'>{skill}</li>
                                        </>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='w-[45%] bg-gray-800 p-4 rounded-xl'>
                            <img className="" src={projects[0]?.bannerImgUrl} alt="banner image" />
                        </div>
                    </div>
                </>
            }
            <div className='mx-auto mt-3 grid grid-cols-2 gap-7'>
                {
                    projects && projects.slice(1, 3).map((each, idx) => <>
                        <Project project={each} key={idx}/>
                    </>)
                }
            </div>
        </div>
    );
};

export default Projects;