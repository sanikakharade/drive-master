// src/components/Hero.js
import React from 'react';

function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-green-500 text-white h-screen flex items-center">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Drive Master</h1>
                <p className="text-xl mb-8">Your road to mastery starts here!</p>
                <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-bold">Get Started</button>
            </div>
        </section>
    );
}

export default Hero;
