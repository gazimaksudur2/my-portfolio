import Navbar from '../../components/Navbar';
import Footer from '../../shared/Footer';
import AboutMe from './AboutMe';
import Banner from './Banner';
import Connect from './Connect';
import Education from './Education';
import Experience from './Experience';
import MySkills from './MySkills';
import Projects from './Projects';
import UnderConstruction from './UnderConstruction';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <UnderConstruction/>
            <Banner/>
            <MySkills/>
            <Projects/>
            <Education/>
            <Experience/>
            <Connect/>
            <AboutMe/>
            <Footer/>
        </div>
    );
};

export default Home;