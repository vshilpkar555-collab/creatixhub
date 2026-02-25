import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Company from './components/Company';
import CaseStudies from './components/CaseStudies';
import Careers from './components/Careers';
import Blog from './components/Blog';
import Partners from './components/Partners';
import ScrollToTop from './components/ScrollToTop';

function MainPage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"             element={<MainPage />} />
          <Route path="/company"      element={<Company />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/careers"      element={<Careers />} />
          <Route path="/blog"         element={<Blog />} />
          <Route path="/partners"     element={<Partners />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
