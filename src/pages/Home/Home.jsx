import Navbar from '../../components/Navbar';
import Footer from '../../shared/Footer';
import AboutMe from './AboutMe';
import Banner from './Banner';
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
            <AboutMe/>
            <Footer/>
        </div>
    );
};

export default Home;