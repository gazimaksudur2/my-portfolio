import { Link } from "react-router-dom";

const ErrorPage = () => {
    const warning1 = "Your intended Page doesn't";
    return (
        <div className="mt-20 flex flex-col items-center justify-center gap-10">
            <img className="w-1/3 mask mask-squircle" src="https://cdn.dribbble.com/userupload/2641500/file/original-b2b4da3f25a13ff275d03cd646d1fec3.png?resize=1024x768" alt="Error image" />
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-[#151515] text-3xl font-bold">404</h2>
                <p className="text-[#151515ab] text-lg font-medium">Page Not Found</p>
                <Link className="mt-6" to={'/'}>
                    <button className="btn btn-outline">Back to Home</button>
                </Link>
            </div>
            <div className="absolute w-full px-8 text-4xl text-[#15151580] font-bold opacity-50 flex justify-between">
                <h1>{warning1}</h1>
                <h1>exists or not constructed yet.</h1>
            </div>
        </div>
    );
};

export default ErrorPage;