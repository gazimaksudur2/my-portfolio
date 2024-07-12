
const Project = ({ project }) => {
    // console.log(project);
    return (
        <div className="mt-4 p-5 rounded-2xl bg-base-200 border-2 border-purple-400 flex flex-col-reverse items-center justify-center gap-5">
            <div className=''>
                <h3 className='text-purple-500'>{project?.projectType}</h3>
                <h1 className='text-[#151515bb] text-2xl font-bold'>{project?.projectTitle}</h1>
                <p className='text-[#151515bb] py-4 text-sm'>{project?.projectDescription}</p>
                {/* <h2 className='mt-2 text-xl font-semibold text-[#151515cb]'>Project Overview</h2> */}
                <ul className='flex items-center justify-start gap-3 flex-wrap'>
                    {
                        project?.skills.map((skill, idx) => <>
                            <li key={idx} className='bg-gradient-to-r from-[#151515db] to-[#15151580] px-3 py-1 rounded-full text-white font-semibold'>{skill}</li>
                        </>)
                    }
                </ul>
                <div className='mt-4 text-sm flex justify-start items-center gap-4'>
                    <a className='text-purple-500 hover:underline cursor-pointer' href={project?.liveSiteLink}>Live site</a>
                    <a className='text-purple-500 hover:underline cursor-pointer' href={project?.liveSiteLink}>Github Client Repo</a>
                    <a className='text-purple-500 hover:underline cursor-pointer' href={project?.liveSiteLink}>Github Server Repo</a>
                </div>
                <div className='mt-4'>
                    <h4 className='text-[#151515ab] font-semibold'>Exciting Features</h4>
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