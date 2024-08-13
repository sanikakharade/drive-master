// src/components/Hero.js
import React from 'react';
import logo from '../drive_img.jpg';
import heroImg from '../hero-bg.jpg';

function Hero() {
    return (
        <section className="text-white h-screen min-h-[400px] flex items-center relative">
            <div className="z-10 bg-black/50 w-full h-full absolute top-0 start-0 backdrop-blur-md "></div>
            {/* <img src={heroImg} className="w-full h-full object-cover z-0 absolute top-0 start-0"> */}
            <div className="z-0 absolute top-0 start-0 w-full h-full">
                <img src={heroImg} className="w-full h-full object-cover" alt="hero" />
            </div>
            <div className="container mx-auto text-center z-10 flex flex-col items-center">
                <img src={logo} alt="" className="h-20 w-fit mb-6" />
                <h1 className="text-5xl font-bold mb-4">Welcome to Drive Master</h1>
                <p className="text-xl mb-8">Your road to mastery starts here!</p>
                <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-bold">Get Started</button>
            </div>
        </section>
    );
}

export default Hero;
