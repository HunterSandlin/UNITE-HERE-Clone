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
        marginLeft: '110px',
        marginRight: '110px'
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '55%',
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
        alignItems: 'center'
    },
    leftSpacer: {
        flex: 1
    },
    centerSection: {
        flex: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontWeight: 300,
        fontSize: { xs: '2rem', md: '2rem' },
        lineHeight: 1.25,
        textAlign: 'center',
        fontFamily,
        whiteSpace: 'pre-line'
    },
    rightSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: '20px',
        gap: '1rem',
        maxWidth: '420px'
    },
    description: {
        color: '#fff',
        fontSize: '1rem',
        lineHeight: 1.2,
        fontFamily
    },
    subscribeButton: {
        alignSelf: 'flex-start',
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

/* Generic banner component, used for newletter banner.
 *  Defaults to newletter right now, if used more probably
 *  will want to remove defaults and pass it in explicitly.
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
