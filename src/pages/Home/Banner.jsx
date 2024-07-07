
const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src="https://i.ibb.co/nk2X4F0/selfie-png.png"
                        className="max-w-sm rounded-lg" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-[#151515db]">👋Hi there!</h1>
                        <h1 className="text-4xl font-bold text-[#151515db]">{"I'm "} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-black">Gazi Maksudur Rahman</span> </h1>
                        <h3 className="text-lg font-semibold text-[#151515ab]">jr. MERN Stack Developer</h3>
                        <p className="py-6 w-[65%] text-[#151515a0]">
                            {"Welcome to my portfolio, where innovation meets excellence. Explore my comprehensive services, cutting-edge solutions, and exceptional expertise. Let's embark on a journey of success together."}
                        </p>
                        <div className="flex items-center justify-start gap-4">
                            <button className="btn btn-primary rounded-full text-white">Download Resume</button>
                            <button className="btn btn-outline rounded-full">Hire Me</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;