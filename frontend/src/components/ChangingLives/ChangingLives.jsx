import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';
import { fontFamily, brandColors, textColors } from 'src/styles/theme';
import Card from 'src/components/Card/Card';

const VISIBLE = 3;
const GAP = 5;

const changingLivesStyles = {
    root: {
        display: 'flex',
        alignItems: 'stretch',
        paddingTop: { xs: '2rem', md: '4rem' },
        paddingBottom: { xs: '2rem', md: '4rem' },
        paddingLeft: { xs: '2rem', md: '7rem' },
        paddingRight: { xs: '2rem', md: '7rem' },
        gap: '2rem'
    },
    leftPanel: {
        flexShrink: 0,
        width: { xs: '100%', md: '244px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: '1.25rem'
    },
    titleWrapper: {
        position: 'relative',
        display: 'inline-block',
        marginBottom: '0.25rem'
    },
    titleRect: {
        position: 'absolute',
        bottom: -2,
        left: 0,
        right: 0,
        height: '10px',
        backgroundColor: 'rgba(200, 200, 200, 0.75)',
        zIndex: 0
    },
    title: {
        position: 'relative',
        zIndex: 1,
        fontWeight: 300,
        fontSize: '1.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily,
        color: '#1a1a1a',
        letterSpacing: '0.05rem',
        lineHeight: 1.2
    },
    description: {
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: textColors.greyDark,
        fontFamily
    },
    learnMoreButton: {
        alignSelf: 'flex-start',
        background: `linear-gradient(90deg, ${brandColors.redLight} 0%, ${brandColors.redDark} 100%)`,
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.8rem',
        fontFamily,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        borderRadius: 0,
        paddingLeft: '40px',
        paddingRight: '40px',
        paddingTop: '15px',
        paddingBottom: '15px'
    },
    rightPanel: {
        flex: 1,
        position: 'relative'
    },
    carouselTrack: {
        display: 'flex',
        gap: `${GAP}px`,
        overflow: 'hidden'
    },
    arrowPrev: {
        position: 'absolute',
        top: '40%',
        transform: 'translateY(-50%)',
        left: -20,
        zIndex: 2,
        color: brandColors.red,
        backgroundColor: '#fff',
        '&:hover': { backgroundColor: 'transparent', color: brandColors.redDark }
    },
    arrowNext: {
        position: 'absolute',
        top: '40%',
        transform: 'translateY(-50%)',
        right: -20,
        zIndex: 2,
        color: brandColors.red,
        backgroundColor: '#fff',
        '&:hover': { backgroundColor: 'transparent', color: brandColors.redDark }
    }
};

const ChangingLives = ({ items = DEFAULT_ITEMS }) => {
    const { t: tCommon } = useTranslation('common');
    const [startIndex, setStartIndex] = useState(0);
    const count = items.length;

    const prev = () => setStartIndex((i) => (i - 1 + count) % count);
    const next = () => setStartIndex((i) => (i + 1) % count);

    const visibleItems = Array.from(
        { length: Math.min(VISIBLE, count) },
        (_, i) => items[(startIndex + i) % count]
    );

    return (
        <Box sx={changingLivesStyles.root}>
            {/* Left panel — title, description, button */}
            <Box sx={changingLivesStyles.leftPanel}>
                <Box sx={changingLivesStyles.titleWrapper}>
                    <Box sx={changingLivesStyles.titleRect} />
                    <Typography component="h2" sx={changingLivesStyles.title}>
                        {tCommon('changingLives.label')}
                    </Typography>
                </Box>

                <Typography sx={changingLivesStyles.description}>
                    {tCommon('changingLives.description')}
                </Typography>

                <Button
                    component="a"
                    href="/changing-lives"
                    sx={changingLivesStyles.learnMoreButton}
                    disableRipple>
                    {tCommon('changingLives.learnMore')}
                </Button>
            </Box>

            {/* Right panel — card carousel */}
            <Box sx={changingLivesStyles.rightPanel}>
                <IconButton onClick={prev} aria-label="Previous" sx={changingLivesStyles.arrowPrev}>
                    <ArrowBackIosNewIcon sx={{ fontSize: 22 }} />
                </IconButton>

                <Box sx={changingLivesStyles.carouselTrack}>
                    {visibleItems.map((item, i) => (
                        <Card
                            key={`${item.href}-${i}`}
                            variant="changingLives"
                            title={tCommon(item.titleKey)}
                            image={item.image}
                            href={item.href}
                        />
                    ))}
                </Box>

                <IconButton onClick={next} aria-label="Next" sx={changingLivesStyles.arrowNext}>
                    <ArrowForwardIosIcon sx={{ fontSize: 22 }} />
                </IconButton>
            </Box>
        </Box>
    );
};

const DEFAULT_ITEMS = [
    {
        titleKey: 'changingLives.wagesAndBenefits',
        image: 'https://unitehere.org/wp-content/uploads/healthcare-483.jpg',
        href: '/changing-lives/wages-and-benefits'
    },
    {
        titleKey: 'changingLives.healthAndSafety',
        image: 'https://unitehere.org/wp-content/uploads/healthandsafety-600d-1.jpg',
        href: '/changing-lives/health-and-safety'
    },
    {
        titleKey: 'changingLives.equityAndCivilRights',
        image: 'https://unitehere.org/wp-content/uploads/pride-416.jpg',
        href: '/changing-lives/equity-and-civil-rights'
    }
];

export default ChangingLives;
