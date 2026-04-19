import { Box, Typography, Link, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { hoverTransition, fontFamily, brandColors } from 'src/styles/theme';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const footerNavColumns = [
    {
        labelKey: 'whoWeAre.label',
        submenu: [
            { labelKey: 'whoWeAre.affiliatesAndLocals', href: '/affiliates-and-locals' },
            { labelKey: 'whoWeAre.industries', href: '/industries' },
            { labelKey: 'whoWeAre.leadership', href: '/leadership' },
            { labelKey: 'whoWeAre.history', href: '/history' },
            { labelKey: 'whoWeAre.globalPartnerships', href: '/global-partnerships' }
        ]
    },
    {
        labelKey: 'projects.label',
        submenu: [
            { labelKey: 'projects.airlineCatering', href: '/airline-catering-its-our-turn' },
            { labelKey: 'projects.buildingPower', href: '/building-power-in-the-hotel-industry' },
            { labelKey: 'projects.inhospitable', href: '/inhospitable-us-immigration-policy' },
            { labelKey: 'projects.immigration', href: '/unite-here-immigration' },
            { labelKey: 'projects.fairHotel', href: '/fairhotel' },
            { labelKey: 'projects.electoralPolitics', href: '/unite-here-electoral-politics' }
        ]
    },
    {
        labelKey: 'changingLives.label',
        submenu: [
            { labelKey: 'changingLives.wagesAndBenefits', href: '/wages-and-benefits' },
            { labelKey: 'changingLives.healthAndSafety', href: '/health-and-safety' },
            { labelKey: 'changingLives.equityAndCivilRights', href: '/equity-and-civil-rights' }
        ]
    },
    {
        labelKey: 'resources.label',
        submenu: [
            { labelKey: 'resources.forRetirees', href: '/for-retirees' },
            { labelKey: 'resources.fairHotelGuide', href: '/fairhotel-union-hotel-guide' },
            { labelKey: 'resources.store', href: '/unite-here-store' },
            { labelKey: 'resources.jobsAndInternships', href: '/unite-here-jobs-and-internships' }
        ]
    }
];

const socialLinks = [
    {
        icon: <FacebookRoundedIcon fontSize="small" />,
        label: 'Facebook',
        href: 'https://facebook.com/unitehere'
    },
    { icon: <XIcon fontSize="small" />, label: 'Twitter', href: 'https://x.com/unitehere' },
    {
        icon: <InstagramIcon fontSize="small" />,
        label: 'Instagram',
        href: 'https://instagram.com/unitehere'
    },
    {
        icon: <YouTubeIcon fontSize="small" />,
        label: 'Youtube',
        href: 'https://youtube.com/unitehere'
    }
];

const footerStyles = {
    root: {
        background: `linear-gradient(90deg, ${brandColors.redDark} 0%, ${brandColors.redLight} 100%)`,
        color: '#fff',
        fontFamily
    },
    mainSection: {
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        paddingLeft: '4rem',
        paddingRight: '2rem'
    },
    innerGrid: {
        display: 'flex',
        gap: 0,
        alignItems: 'flex-start'
    },
    logoBlock: {
        flexShrink: 0,
        paddingRight: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    logoLink: {
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        marginBottom: '.5rem'
    },
    logoUnite: {
        fontWeight: 900,
        letterSpacing: '-3px',
        fontSize: '3.3rem',
        lineHeight: 1,
        color: '#fff',
        display: 'block'
    },
    logoHereRow: {
        display: 'flex',
        alignItems: 'baseline'
    },
    logoHere: {
        fontWeight: 900,
        letterSpacing: '-3px',
        fontSize: '3.3rem',
        lineHeight: 1,
        color: '#1a1a1a'
    },
    logoExclamation: {
        fontWeight: 900,
        letterSpacing: '-3px',
        fontSize: '3.3rem',
        lineHeight: 1,
        color: '#fff'
    },
    addressText: {
        fontSize: '0.9rem',
        lineHeight: 1.75,
        color: '#fff',
        marginBottom: '1.25rem'
    },
    verticalDivider: {
        width: '2px',
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        flexShrink: 0,
        marginRight: '3rem',
        opacity: 0.85
    },
    navColumnsBlock: {
        display: 'flex',
        flex: 1,
        gap: '0.5rem'
    },
    navColumn: {
        flex: 1,
        minWidth: 0
    },
    navColumnHeader: {
        fontWeight: 900,
        fontSize: '0.9rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#000',
        marginBottom: '0.75rem',
        display: 'block'
    },
    navColumnLink: {
        display: 'block',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '0.9rem',
        lineHeight: 1.65,
        ...hoverTransition
    },
    followBlock: {
        flexShrink: 0,
        paddingLeft: '2rem',
        minWidth: '145px'
    },
    followHeader: {
        fontWeight: 900,
        fontSize: '0.9rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#000',
        marginBottom: '0.75rem',
        display: 'block'
    },
    socialLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '0.95rem',
        lineHeight: 1.9,
        ...hoverTransition
    },
    horizontalDivider: {
        borderColor: 'rgba(0,0,0,0.25)',
        borderBottomWidth: '1px',
        marginLeft: '50px',
        marginRight: '50px'
    },
    bottomSection: {
        paddingTop: '3rem',
        paddingBottom: '1.5rem',
        paddingLeft: '4rem'
    },
    disclaimer: {
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.85)',
        marginBottom: '0.75rem'
    },
    bottomLinks: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    bottomLink: {
        color: '#fff',
        fontSize: '0.95rem',
        textDecoration: 'none',
        ...hoverTransition
    },
    bottomSeparator: {
        color: 'rgba(255,255,255,0.5)',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        fontSize: '0.95rem'
    }
};

const Footer = () => {
    const { t: tCommon } = useTranslation('common');
    const { t: tFooter } = useTranslation('footer');

    return (
        <Box component="footer" sx={footerStyles.root}>
            <Box sx={footerStyles.mainSection}>
                <Box sx={footerStyles.innerGrid}>
                    <Box sx={footerStyles.logoBlock}>
                        <Box component="a" href="/" sx={footerStyles.logoLink}>
                            <Typography component="span" sx={footerStyles.logoUnite}>
                                UNITE
                            </Typography>
                            <Box sx={footerStyles.logoHereRow}>
                                <Typography component="span" sx={footerStyles.logoHere}>
                                    HERE
                                </Typography>
                                <Typography component="span" sx={footerStyles.logoExclamation}>
                                    !
                                </Typography>
                            </Box>
                        </Box>

                        <Typography sx={footerStyles.addressText}>
                            275 7th Avenue, 16th Floor
                            <br />
                            New York, NY 10001-6708
                            <br />
                            Tel. 212-265-7000
                        </Typography>

                        <Typography sx={footerStyles.addressText}>
                            UNITE HERE Canada
                            <br />
                            200 Consumers Rd, Suite 406
                            <br />
                            Toronto, Ontario M2J 4R4
                            <br />
                            Tel. 416-384-0983
                        </Typography>
                    </Box>

                    <Box sx={footerStyles.verticalDivider} />

                    <Box sx={footerStyles.navColumnsBlock}>
                        {footerNavColumns.map((col) => (
                            <Box key={col.labelKey} sx={footerStyles.navColumn}>
                                <Typography component="span" sx={footerStyles.navColumnHeader}>
                                    {tCommon(col.labelKey)}
                                </Typography>
                                {col.submenu.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        sx={footerStyles.navColumnLink}>
                                        {tCommon(item.labelKey)}
                                    </Link>
                                ))}
                            </Box>
                        ))}
                    </Box>

                    <Box sx={footerStyles.followBlock}>
                        <Typography component="span" sx={footerStyles.followHeader}>
                            {tFooter('followUs')}
                        </Typography>
                        {socialLinks.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={footerStyles.socialLink}>
                                {social.icon}
                                {social.label}
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Divider sx={footerStyles.horizontalDivider} />

            <Box sx={footerStyles.bottomSection}>
                <Typography sx={footerStyles.disclaimer}>{tFooter('disclaimer')}</Typography>
                <Box sx={footerStyles.bottomLinks}>
                    {[
                        { labelKey: 'credits', href: '/credits' },
                        { labelKey: 'privacyPolicy', href: '/privacy-policy' },
                        {
                            labelKey: 'canadianPrivacy',
                            href: '/canadian-member-data-privacy-policy'
                        },
                        { labelKey: 'pac', href: '/about-unite-here-pacs' }
                    ].map((link, i, arr) => (
                        <Box key={link.href} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link href={link.href} sx={footerStyles.bottomLink}>
                                {tFooter(link.labelKey)}
                            </Link>
                            {i < arr.length - 1 && (
                                <Typography component="span" sx={footerStyles.bottomSeparator}>
                                    |
                                </Typography>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
