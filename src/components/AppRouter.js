import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Games from '../pages/Games';
import AboutMe from '../pages/AboutMe';
import Unfinished from '../pages/Unfinished';
import EESCalculator from '../pages/EESCalculator';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Games />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/unfinished" element={<Unfinished />} />
            <Route path="/ees-calculator" element={<EESCalculator />} />
        </Routes>
    );
};

export default AppRouter;
