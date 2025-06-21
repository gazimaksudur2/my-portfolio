import { HiMiniFire } from "react-icons/hi2";
import { ScrollRestoration } from "react-router-dom";

const Education = () => {
	return (
		<div id="education" className="py-10 w-[80%] lg:w-[70%] mx-auto">
			<ScrollRestoration />
			<div className="space-y-2 flex flex-col justify-center items-center text-center">
				<h1 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-gray-400 text-2xl font-bold">
					Education
				</h1>
			</div>
			<div className="mt-8">
				<ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
					<li>
						<div className="timeline-middle">
							<HiMiniFire className="h-5 w-5 text-purple-500 p-[1px] border-[2px] border-purple-500 rounded-full" />
							{/* <img className="h-5 w-5 " src="https://www.svgrepo.com/show/500378/fire.svg" alt="running state" /> */}
							{/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd" />
                            </svg> */}
						</div>
						<div className="timeline-start mr-2 md:text-end pb-5 lg:pb-0">
							<time className="font-mono italic">2022 - present</time>
							<h2 className="text-lg font-black">
								Computer Science and Engineering
							</h2>
							<h4 className="text-[#151515bd]">BSc. in Engineering</h4>
							<div className="mt-2 flex justify-center items-center gap-3">
								<img
									className="w-8 h-8"
									src="https://www.sust.edu/images/logo.png"
									alt="sust logo"
								/>
								<h2 className="font-medium text-[#151515db]">
									Shahjalal University of Science and Technology
								</h2>
							</div>
						</div>
						<hr />
					</li>
					<li className="">
						<hr />
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5 text-purple-500"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5-5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="timeline-end pb-5 lg:pb-0">
							<time className="font-mono italic">2018 - 2020</time>
							<h2 className="text-lg font-black">Science Department</h2>
							<h4 className="text-[#151515bd]">
								Higher Secondary School Certificate
							</h4>
							<div className="mt-2 flex justify-center items-center gap-3">
								<img
									className="w-8 h-8"
									src="https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-6/347778677_1265633041011051_2411880285562199077_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHEdNpNSKN9OxT2-Cah_JPufD-3YsgoaNN8P7diyCho09zqdElaeZFfbW60hOtn8kCYWxIcEWJJsNHtOuW_ia8p&_nc_ohc=7ICBSoJsPnUQ7kNvgHzfRQ3&_nc_ht=scontent.fdac24-5.fna&oh=00_AYAJxPxC9iGrkv0N7v8Ufhy1UJ7_0aQTjjq2Kf8LkUSXqw&oe=6691B62C"
									alt="hasan logo"
								/>
								<h2 className="font-medium text-[#151515db]">
									Major General Mahmudul Hasan Adarsha College, Tangail
								</h2>
							</div>
						</div>
						<hr />
					</li>
					<li>
						<hr />
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5 text-purple-500"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="timeline-start md:text-end">
							<time className="font-mono italic">2016 - 2018</time>
							<h2 className="text-lg font-black">Science Department</h2>
							<h4 className="text-[#151515bd]">Secondary School Certificate</h4>
							<div className="mt-2 flex justify-center items-center gap-3">
								<img
									className="w-8 h-8"
									src="https://i.ibb.co/bXJ5kmH/jamuky-Logo.png"
									alt="jamurky logo"
								/>
								<h2 className="font-medium text-[#151515db]">
									Jamurky N.S.A.G High School, Tangail
								</h2>
							</div>
						</div>
						{/* <hr /> */}
					</li>
					{/* <li>
                        <hr />
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5 text-purple-500">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="timeline-end mb-10">
                        <time className="font-mono italic">2022 - present</time>
                            <h2 className="text-lg font-black">Computer Science and Engineering</h2>
                            <h4 className="text-[#151515bd]">BSc. in Engineering</h4>
                            <div className="mt-2 flex justify-center items-center gap-3">
                                <img className="w-8 h-8" src="https://www.sust.edu/images/logo.png" alt="sust logo" />
                                <h2 className="font-medium text-[#151515db]">Shahjalal University of Science and Technology</h2>
                            </div>
                        </div>
                    </li> */}
				</ul>
			</div>
		</div>
	);
};

export default Education;
