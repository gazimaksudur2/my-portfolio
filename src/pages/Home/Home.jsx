import Navbar from '../../components/Navbar';
import Footer from '../../shared/Footer';
import Banner from './Banner';
import MySkills from './MySkills';
import UnderConstruction from './UnderConstruction';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <UnderConstruction/>
            <Banner/>
            <MySkills/>
            <Footer/>
        </div>
    );
};

export default Home;