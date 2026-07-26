import React from 'react';
import About from './About';
import Education from './Education';
import Skills from './Skills';
import Certificates from './Certificates';
import HeroScroll from './HeroScroll';

const Home = () => {
    return (
        <div className="home-container w-full overflow-x-clip">
            <HeroScroll />

            <section id="about" className="w-full">
                <About />
            </section>

            <section id="education" className="w-full">
                <Education />
            </section>

            <section id="skills" className="pb-20 w-full">
                <Skills />
            </section>

            <section id="certificates" className="pb-20 w-full">
                <Certificates />
            </section>
        </div>
    );
};

export default Home;