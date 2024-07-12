import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import { Link, ScrollRestoration } from 'react-router-dom';

const MySkills = () => {
    const [skills, setSkills] = useState([]);
    // const heading = "Our Valued skillss";
    // const subHeading = "Meet our valued skillss whose generous support across various levels—Platinum, Gold, Silver, Bronze, and Community—drives our mission and success, enabling us to achieve our goals and initiatives";

    useEffect(() => {
        fetch('sponsors.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setSkills(data);
            })
    }, [])
    return (
        <div id='skills' className='relative py-10 flex flex-col justify-center items-center'>
            <ScrollRestoration/>
            <div className='space-y-2 flex flex-col justify-center items-center'>
                <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-gray-500 text-3xl font-bold'>My Skills</h1>
                <h3 className='w-[60%] text-sm text-center text-[#151515ab]'>My continuous learning mindset keeps me updated with the latest trends and technologies in web development, enabling me to deliver cutting-edge solutions.</h3>
            </div>
            <div className='w-[70%] mx-auto mt-5 flex flex-wrap justify-center items-center gap-10'>
                {
                    skills.map((each, idx) => <>
                        <div className="w-52 group text-center" key={idx}>
                            <div className="card-body bg-base-200 border-2 border-base-300 flex flex-col justify-center items-center rounded-md duration-100 hover:bg-purple-500 hover:border-purple-800 hover:text-white gap-3">
                                <img className='w-10 group-hover:scale-[130%] duration-[.4s]' src={each?.logo_url} alt="Shoes" />
                                <h2 className="card-title">{each?.technology}</h2>
                            </div>
                        </div>
                    </>)
                }
            </div>
            <Link to={'#top'} className="absolute bottom-0 right-24 border-2 p-2 rounded-full text-purple-600 border-purple-600 cursor-pointer active:scale-95">
                <FaArrowUp className="" size={22} />
            </Link>
        </div>
    );
};

export default MySkills;
// grid grid-cols-4 justify-items-center place-content-center 