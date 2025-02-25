import React, { useRef } from 'react'
import Header from '../Components/Landing Page/Header';
import Home from '../Components/Landing Page/Home';
import About from '../Components/Landing Page/About';
import Services from '../Components/Landing Page/Services';
import Contact from '../Components/Landing Page/Contact';
import Footer from '../Components/Landing Page/Footer';

const LandingPage = () => {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (section) => {
        if (section === "#home") {
            homeRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (section === "#about") {
            aboutRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (section === "#services") {
            servicesRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (section === "#contact") {
            contactRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div >
            <Header scrollToSection={scrollToSection} />
            <div ref={homeRef}>
                <Home />
            </div>
            <div ref={aboutRef} className=''>
                <About />
            </div>
            <div ref={servicesRef}>
                <Services />
            </div>
            <div ref={contactRef}>
                <Contact />
            </div>
            <Footer scrollToSection={scrollToSection} />
        </div>
    )
}

export default LandingPage
