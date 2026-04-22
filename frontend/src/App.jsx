import { Box } from '@mui/material';
import { dividerStyles } from './styles/layout';

import NavBar from 'src/components/NavBar/NavBar';
import Hero from 'src/components/Hero';
import Projects from 'src/components/Projects';
import ChangingLives from 'src/components/ChangingLives';
import Banner from 'src/components/Banner';
import Footer from 'src/components/Footer';
import RecentNews from 'src/components/RecentNews';
import FindAffiliate from 'src/components/FindAffiliate';

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
            <FindAffiliate />
            <Footer />
        </>
    );
}

export default App;
