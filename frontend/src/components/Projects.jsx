import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';
import { fontFamily, brandColors } from 'src/styles/theme';
import Card from './Card';

const VISIBLE = 3;
const GAP = 5;
const TITLE_LINE_HEIGHT_PX = 35;
const TITLE_RECT_RATIO = 0.35;

const projectsStyles = {
    root: {
        background: 'linear-gradient(0deg, #f2f2f2 0%, #ffffff 40%)',
        paddingTop: { xs: '2rem', md: '4rem' },
        paddingBottom: { xs: '2rem', md: '4rem' },
        paddingLeft: { xs: '2rem', md: '6.8rem' },
        paddingRight: { xs: '2rem', md: '6.8rem' }
    },
    titleWrapper: {
        position: 'relative',
        display: 'inline-block',
        marginBottom: '0.4rem'
    },
    titleRect: {
        position: 'absolute',
        bottom: -2,
        left: 0,
        right: 0,
        height: `${Math.round(TITLE_LINE_HEIGHT_PX * TITLE_RECT_RATIO)}px`,
        backgroundColor: 'rgba(200, 200, 200, 0.75)',
        zIndex: 0
    },
    titleText: {
        position: 'relative',
        zIndex: 1,
        fontWeight: 300,
        fontSize: '1.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily,
        color: '#1a1a1a',
        lineHeight: `${TITLE_LINE_HEIGHT_PX}px`
    },
    carouselWrapper: {
        position: 'relative'
    },
    carouselTrack: {
        display: 'flex',
        gap: `${GAP}px`,
        overflow: 'hidden'
    },
    arrowPrev: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: -20,
        zIndex: 2,
        color: brandColors.red,
        background: '#fff',
        '&:hover': { backgroundColor: 'transparent', color: brandColors.redDark }
    },
    arrowNext: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: -20,
        zIndex: 2,
        color: brandColors.red,
        background: '#fff',
        '&:hover': { backgroundColor: 'transparent', color: brandColors.redDark }
    }
};

const SectionTitle = ({ children }) => (
    <Box sx={projectsStyles.titleWrapper}>
        <Box sx={projectsStyles.titleRect} />
        <Typography component="h2" sx={projectsStyles.titleText}>
            {children}
        </Typography>
    </Box>
);

const Projects = ({ projects = DEFAULT_PROJECTS }) => {
    const { t: tCommon } = useTranslation('common');
    const [startIndex, setStartIndex] = useState(0);
    const count = projects.length;

    const prev = () => setStartIndex((i) => (i - 1 + count) % count);
    const next = () => setStartIndex((i) => (i + 1) % count);

    const visibleCards = Array.from(
        { length: VISIBLE },
        (_, i) => projects[(startIndex + i) % count]
    );

    return (
        <Box sx={projectsStyles.root}>
            <SectionTitle>{tCommon('projects.label')}</SectionTitle>

            <Box sx={projectsStyles.carouselWrapper}>
                <IconButton
                    onClick={prev}
                    aria-label="Previous projects"
                    sx={projectsStyles.arrowPrev}>
                    <ArrowBackIosNewIcon sx={{ fontSize: 28 }} />
                </IconButton>

                <Box sx={projectsStyles.carouselTrack}>
                    {visibleCards.map((project, i) => (
                        <Card
                            key={`${project.href}-${i}`}
                            variant="project"
                            title={tCommon(project.titleKey)}
                            image={project.image}
                            href={project.href}
                        />
                    ))}
                </Box>

                <IconButton onClick={next} aria-label="Next projects" sx={projectsStyles.arrowNext}>
                    <ArrowForwardIosIcon sx={{ fontSize: 28 }} />
                </IconButton>
            </Box>
        </Box>
    );
};

const DEFAULT_PROJECTS = [
    {
        titleKey: 'projects.airlineCatering',
        image: 'https://unitehere.org/wp-content/uploads/its-our-turn.jpg',
        href: '/project/airline-catering'
    },
    {
        titleKey: 'projects.buildingPower',
        image: 'https://unitehere.org/wp-content/uploads/hotel-strikes-cover.jpg',
        href: '/project/building-power-in-the-hotel-industry'
    },
    {
        titleKey: 'projects.inhospitable',
        image: 'https://unitehere.org/wp-content/uploads/inhospitable.jpg',
        href: '/project/inhospitable'
    },
    {
        titleKey: 'projects.immigration',
        image: 'https://unitehere.org/wp-content/uploads/immigration-campaign.jpg',
        href: '/project/immigration'
    },
    {
        titleKey: 'projects.fairHotel',
        image: 'https://unitehere.org/wp-content/uploads/FairHotel-Campaign-Graphic.jpg',
        href: '/project/fairhotel'
    },
    {
        titleKey: 'projects.electoralPolitics',
        image: 'https://unitehere.org/wp-content/uploads/workers-vote-1.jpg',
        href: '/project/electoral-politics'
    }
];

export default Projects;
