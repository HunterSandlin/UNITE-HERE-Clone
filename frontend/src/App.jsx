import { Box } from '@mui/material';
import { dividerStyles } from './styles/layout';

import NavBar from 'src/components/NavBar/NavBar';
import Hero from 'src/components/Hero/Hero';
import Projects from 'src/components/Projects/Projects';
import ChangingLives from 'src/components/ChangingLives/ChangingLives';
import Banner from 'src/components/Banner/Banner';
import Footer from 'src/components/Footer/Footer';
import RecentNews from 'src/components/RecentNews/RecentNews';
import FindAffiliate from 'src/components/FindAffiliate/FindAffiliate';

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
