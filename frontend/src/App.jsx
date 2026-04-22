import { Box } from '@mui/material';
import { dividerStyles } from './styles/layout';

import NavBar from './components/NavBar/NavBar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ChangingLives from './components/ChangingLives';
import Banner from './components/Banner';
import Footer from './components/Footer';
import RecentNews from './components/RecentNews';

function App() {
    return (
        <>
            <NavBar />
            <Hero />
            <Projects />
            <ChangingLives />
            {/* Divider */}
            <Box sx={dividerStyles} />
            <RecentNews />
            <Banner />
            <Footer />
        </>
    );
}

export default App;
