import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fontFamily, brandColors } from 'src/styles/theme';

const bannerStyles = {
    root: {
        position: 'relative',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: { xs: '20px', md: '110px' },
        marginRight: { xs: '20px', md: '110px' }
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: { xs: '100%', md: '55%' },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${brandColors.redLight} 50%)`,
        zIndex: 1
    },
    contentWrapper: {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center'
    },
    leftSpacer: {
        display: { xs: 'none', md: 'flex' },
        flex: 1
    },
    centerSection: {
        flex: { xs: 'unset', md: 0.5 },
        width: { xs: '100%', md: 'auto' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: { xs: '2rem', md: 0 },
        paddingBottom: { xs: '1rem', md: 0 },
        paddingLeft: '1rem',
        paddingRight: '1rem'
    },
    title: {
        color: '#fff',
        fontWeight: 300,
        fontSize: { xs: '1.8rem', md: '2rem' },
        lineHeight: 1.25,
        textAlign: 'center',
        fontFamily,
        whiteSpace: 'pre-line'
    },
    rightSection: {
        flex: { xs: 'unset', md: 1 },
        width: { xs: '100%', md: 'auto' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'center',
        paddingRight: { xs: '1rem', md: '20px' },
        paddingLeft: { xs: '1rem', md: 0 },
        paddingBottom: { xs: '2rem', md: 0 },
        gap: '1rem',
        maxWidth: { xs: '100%', md: '420px' }
    },
    description: {
        color: '#fff',
        fontSize: '1rem',
        lineHeight: 1.2,
        textAlign: { xs: 'center', md: 'left' },
        fontFamily
    },
    subscribeButton: {
        backgroundColor: '#fff',
        color: brandColors.red,
        fontWeight: 700,
        fontSize: '0.75rem',
        fontFamily,
        textTransform: 'uppercase',
        borderRadius: 0,
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        paddingTop: '0.45rem',
        paddingBottom: '0.45rem',
        border: `2px solid #fff`,
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#fff'
        }
    }
};

/*
 * Generic banner component, used for newsletter banner.
 * Defaults to newsletter right now, if used more probably
 * will want to remove defaults and pass it in explicitly.
 */
const Banner = ({
    imageSrc = '/newsletter.png',
    titleKey = 'newsletter.title',
    descriptionKey = 'newsletter.description',
    buttonKey = 'newsletter.button',
    buttonHref = '/subscribe-to-updates'
}) => {
    const { t: tCommon } = useTranslation('common');

    return (
        <Box sx={bannerStyles.root}>
            <Box
                sx={{
                    ...bannerStyles.backgroundImage,
                    backgroundImage: `url(${imageSrc})`
                }}
            />

            <Box sx={bannerStyles.gradientOverlay} />

            <Box sx={bannerStyles.contentWrapper}>
                <Box sx={bannerStyles.leftSpacer} />

                <Box sx={bannerStyles.centerSection}>
                    <Typography component="h2" sx={bannerStyles.title}>
                        {tCommon(titleKey)}
                    </Typography>
                </Box>

                <Box sx={bannerStyles.rightSection}>
                    <Typography sx={bannerStyles.description}>{tCommon(descriptionKey)}</Typography>
                    <Button
                        component="a"
                        href={buttonHref}
                        sx={bannerStyles.subscribeButton}
                        disableRipple>
                        {tCommon(buttonKey)}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Banner;
