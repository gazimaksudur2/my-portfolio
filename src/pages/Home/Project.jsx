
const Project = ({ project }) => {
    // console.log(project);
    return (
        <div className="mt-4 p-5 rounded-2xl bg-base-200 border-2 border-gray-400 flex flex-col-reverse items-center justify-center gap-5">
            <div className=''>
                <h3>{project?.projectType}</h3>
                <h1>{project?.projectTitle}</h1>
                <p>{project?.projectDescription}</p>
                <ul className='flex items-center justify-start gap-3'>
                    {
                        project?.skills.map((skill, idx) => <>
                            <li key={idx} className='bg-purple-700 px-3 py-1 rounded-full text-white font-semibold'>{skill}</li>
                        </>)
                    }
                </ul>
                <h2>Project Overview</h2>
                <div>
                    <p>Live site: <span>{project?.liveSiteLink}</span></p>
                    <p>Github Client Repo: <span></span></p>
                    <p>Github Server Repo: <span></span></p>
                    <h4>Exciting Features</h4>
                    <ul className='list-disc pl-6 py-2 mt-2 bg-white rounded-xl'>
                        {
                            project?.features.map((skill, idx) => <>
                                <li key={idx} className='font-medium'>{skill}</li>
                            </>)
                        }
                    </ul>
                </div>
            </div>
            <div className='bg-gray-800 p-4 rounded-xl'>
                <img className="" src={project?.bannerImgUrl} alt="banner image" />
            </div>
        </div>
    );
};

export default Project;