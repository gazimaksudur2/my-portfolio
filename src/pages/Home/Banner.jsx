// import { GoDownload } from "react-icons/go";

const Banner = () => {
    // const downloadPdf = () => {
    //     const pdfUrl = 'https://drive.google.com/file/d/1-AoHayQihlWRG17EFwtaeCt7q30zsTQt/view?usp=sharing';
            
    //         // Creating an anchor element and simulating a click
    //         const link = document.createElement('a');
    //         link.href = pdfUrl;
    //         link.download = "Gazi's Resume.pdf"; // Optional: Specify a default name for the downloaded file
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    // }
    return (
        <div>
            <div className="hero min-h-[80vh]">
                {/* <div className="text-3xl hover:rotate-45">👋</div> */}
                <div className="w-[90%] lg:w-full hero-content flex-col-reverse lg:flex-row-reverse">
                    <img
                        src="https://i.ibb.co/nk2X4F0/selfie-png.png"
                        className="max-w-xs lg:max-w-sm rounded-lg bg-purple-200 border-4 border-purple-400 hover:rotate-6 duration-[.3s] hover:border-purple-700 scale-90 hover:scale-100 shadow-xl shadow-purple-300 hover:shadow-none" />
                    <div className="space-y-2">
                        <h1 className="text-xl lg:text-3xl font-semibold text-[#151515db]"><span className="duration-150 hover:scale-110 cursor-pointer">👋</span>Hi there!</h1>
                        <h1 className="text-2xl lg:text-4xl font-bold text-[#151515db]">{"I'm "} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-black">Gazi Maksudur Rahman</span> </h1>
                        <h3 className="lg:text-lg font-semibold text-[#151515ab]">jr. MERN Stack Developer</h3>
                        <p className="py-2 lg:py-6 lg:w-[65%] text-[#151515a0]">
                            {"Welcome to my portfolio, where innovation meets excellence. Explore my comprehensive services, cutting-edge solutions, and exceptional expertise. Let's embark on a journey of success together."}
                        </p>
                        <div className="flex items-center justify-start gap-4">
                        {/* <a href="../../assets/Gazi Maksudur Rahman Developer Resume (1).pdf" download={"gazi's_resume.pdf"} className="btn btn-primary btn-sm lg:btn-md bg-purple-600 hover:bg-purple-400 border-purple-700 rounded-full text-white">Download Resume</a> */}
                        <a href="https://drive.google.com/file/d/1-AoHayQihlWRG17EFwtaeCt7q30zsTQt/view?usp=sharing" target="_blank" className="btn btn-primary btn-sm lg:btn-md bg-purple-600 hover:bg-purple-400 border-purple-700 rounded-full text-white">Download Resume</a>
                            <button className="btn btn-outline btn-sm lg:btn-md rounded-full">Hire Me</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;