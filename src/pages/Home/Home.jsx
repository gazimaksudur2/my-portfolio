import Navbar from '../../components/Navbar';
import Footer from '../../shared/Footer';
import AboutMe from './AboutMe';
import Banner from './Banner';
import Connect from './Connect';
import Education from './Education';
import Experience from './Experience';
import MySkills from './MySkills';
import Projects from './Projects';
// import UnderConstruction from './UnderConstruction';

const Home = () => {
    return (
        <div>
            <Navbar />
            {/* <UnderConstruction /> */}
            <Banner />
            <MySkills />
            <Projects />
            <Education />
            <Experience />
            <Connect />
            <AboutMe />
            <Footer />
            {/* <div className="fixed z-50 border-2 p-2 rounded-full text-purple-600 border-purple-600 cursor-pointer active:scale-95">
                <FaArrowUp className="" size={22} />
            </div> */}
        </div>
    );
};

export default Home;