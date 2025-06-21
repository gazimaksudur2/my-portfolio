import Navbar from '../../components/Navbar';
import Footer from '../../shared/Footer';
import AboutMe from './AboutMe';
import Banner from './Banner';
import Connect from './Connect';
import Education from './Education';
import Experience from './Experience';
import MySkills from './MySkills';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Services from './Services';
// import UnderConstruction from './UnderConstruction';

const Home = () => {
    return (
        <div>
            <Navbar />
            {/* <UnderConstruction /> */}
            <main className="pt-16 lg:pt-20"> {/* Account for fixed navbar */}
                <Banner />
                <AboutMe />
                <MySkills />
                <Services />
                <Projects />
                <Experience />
                <Education />
                <Testimonials />
                <Connect />
            </main>
            <Footer />
            {/* Scroll to top button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 z-40 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Scroll to top"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </div>
    );
};

export default Home;