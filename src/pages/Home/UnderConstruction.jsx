import { Typewriter } from 'react-simple-typewriter';

const UnderConstruction = () => {
    const info = {
        title: 'This Project is Under Construction',
        description: "This is the Short description of my portfolio project"
    };


    return (
        info && <div className='pt-20 w-[70%] mx-auto text-center flex flex-col justify-center items-center gap-2'>
            <h1 className="mb-2 text-5xl font-bold font-roboto">
                {"Here"}  <span className='text-red-500'><Typewriter
                    words={[info?.title]}
                    loop={5}
                    cursor
                    cursorStyle='_'
                    typeSpeed={90}
                    deleteSpeed={50}
                    delaySpeed={1300}
                /></span>
            </h1>
            {/* <p className='text-[#151515bc]'>{info?.description}</p> */}
        </div>
    );
};

export default UnderConstruction;