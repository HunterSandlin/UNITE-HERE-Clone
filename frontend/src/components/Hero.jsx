import { Box, Typography, Container } from '@mui/material';

const HEADLINE_LINE_HEIGHT_PX = {
    xs: 48,
    md: 75
};

// How much of the text the rect is behind
const RECT_RATIO = 0.7;

// How far the rect is pushed down from the bottom of the container
const RECT_BOTTOM_OFFSET = {
    xs: -4,
    md: -8
};

const heroStyles = {
    root: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        minHeight: { xs: 280, md: 420 },
        bgcolor: '#b00000'
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
        objectFit: 'cover'
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none'
    },
    innerContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: { xs: 1, md: 1.5 },
        pl: { xs: '40px', md: '64px' }
    },
    headlineWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    headlineLineContainer: {
        position: 'relative',
        display: 'inline-block',
        height: {
            xs: `${HEADLINE_LINE_HEIGHT_PX.xs}px`,
            md: `${HEADLINE_LINE_HEIGHT_PX.md}px`
        }
    },
    headlineRect: {
        position: 'absolute',
        left: 0,
        right: 0,
        bgcolor: '#cd0e11',
        bottom: {
            xs: `${RECT_BOTTOM_OFFSET.xs}px`,
            md: `${RECT_BOTTOM_OFFSET.md}px`
        },
        height: {
            xs: `${Math.round(HEADLINE_LINE_HEIGHT_PX.xs * RECT_RATIO)}px`,
            md: `${Math.round(HEADLINE_LINE_HEIGHT_PX.md * RECT_RATIO)}px`
        },
        zIndex: 0
    },
    headlineText: {
        position: 'relative',
        zIndex: 1,
        color: '#fff',
        fontWeight: 600,
        fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.2rem' },
        lineHeight: 1,
        letterSpacing: '-0.5px',
        fontFamily: 'Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif',
        display: 'block',
        px: { xs: 1.5, md: 2 },
        whiteSpace: 'nowrap'
    },
    ctaWrapper: {
        position: 'relative',
        display: 'inline-block',
        pointerEvents: 'auto',
        marginTop: '20px'
    },
    ctaRect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(255, 255, 255, 0.92)'
    },
    ctaText: {
        position: 'relative',
        padding: '0px 20px 0px 20px',
        color: '#cd0e11',
        fontWeight: 900,
        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
        lineHeight: 1.25,
        whiteSpace: 'pre-line',
        textShadow: '0.4px 0 0 currentColor, -0.4px 0 0 currentColor'
    }
};

const HeadlineLine = ({ text }) => (
    <Box sx={heroStyles.headlineLineContainer}>
        <Box sx={heroStyles.headlineRect} />
        <Typography component="span" sx={heroStyles.headlineText}>
            {text}
        </Typography>
    </Box>
);

const HeroSection = ({
    imageSrc = '/hero/hero-11.jpg',
    imageAlt = 'UNITE HERE workers',
    headlineLines = ['One job should', 'be enough—'],
    ctaText = "Join the union\nthat's fighting for\nour families.",
    ctaHref = '/organize-a-union'
}) => {
    return (
        <Box sx={heroStyles.root}>
            <Box
                component="img"
                src={imageSrc}
                alt={imageAlt}
                sx={heroStyles.image}
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />

            <Box sx={heroStyles.overlayContainer}>
                <Container maxWidth="xl" sx={heroStyles.innerContainer}>
                    <Box sx={heroStyles.headlineWrapper}>
                        {headlineLines.map((line, i) => (
                            <HeadlineLine key={i} text={line} />
                        ))}
                    </Box>

                    <Box sx={heroStyles.ctaWrapper}>
                        <Box sx={heroStyles.ctaRect} />
                        <Typography href={ctaHref} sx={heroStyles.ctaText}>
                            {ctaText}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default HeroSection;
