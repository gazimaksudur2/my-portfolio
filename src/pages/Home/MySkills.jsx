import { useEffect, useState } from 'react';

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
        <div className='py-10'>
            <div className='flex flex-col justify-center items-center'>
                <h1>My Skills</h1>
                <h3></h3>
            </div>
            <div className='w-full flex justify-center items-center gap-10'>
                {
                    skills.map(each => <>
                        <div className="w-40 py-4">
                            <div className="card-body flex flex-col justify-center items-center shadow-xl shadow-red-100 rounded-md duration-100 hover:shadow-none hover:border-2 hover:border-base-300">
                                <img className='w-10' src={each?.logo_url} alt="Shoes" />
                                <h2 className="card-title">{each?.company_name}</h2>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};

export default MySkills;