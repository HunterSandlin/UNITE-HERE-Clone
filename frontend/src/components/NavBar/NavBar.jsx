import { useState, useRef } from 'react';
import { navData, secondaryNavData } from './navData';
import { useTranslation } from 'react-i18next';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
    Container,
    Stack,
    Popper,
    MenuItem,
    MenuList,
    Paper,
    Grow
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Maps icon names from API to MUI icons
const iconMap = {
    search: <SearchIcon />
};

const navDropdownStyles = {
    wrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    paper: {
        bgcolor: '#b00000',
        color: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        minWidth: 260,
        mt: 0
    },
    menuItem: {
        fontWeight: 700,
        fontSize: '0.855rem',
        py: 1.8,
        px: 3,
        '&:hover': {
            bgcolor: 'rgba(255,255,255,0.15)',
            color: '#ffd700'
        }
    }
};

const NavDropdown = ({ label, href, submenu }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    return (
        <Box
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            sx={navDropdownStyles.wrapper}>
            <Button ref={anchorRef} component="a" href={href} sx={styles.mainNavButton}>
                {label}
            </Button>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                disablePortal
                transition>
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: 'top left' }}>
                        <Paper sx={navDropdownStyles.paper}>
                            <MenuList disablePadding>
                                {submenu.map((item) => (
                                    <MenuItem
                                        key={item.href}
                                        component="a"
                                        href={item.href}
                                        sx={navDropdownStyles.menuItem}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    );
};

const socialLinks = [
    { icon: <FacebookRoundedIcon />, href: 'https://facebook.com/unitehere', label: 'Facebook' },
    { icon: <XIcon />, href: 'https://x.com/unitehere', label: 'X (Twitter)' },
    { icon: <InstagramIcon />, href: 'https://instagram.com/unitehere', label: 'Instagram' },
    { icon: <YouTubeIcon />, href: 'https://youtube.com/unitehere', label: 'YouTube' }
];

const styles = {
    appBar: {
        background: 'linear-gradient(90deg, #cd0e11 0%, #a6090b 100%)',
        color: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        lineHeight: 1,
        fontFamily: 'Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif'
    },
    toolbar: {
        minHeight: 128,
        display: 'flex',
        justifyContent: 'space-between',
        px: 3
    },
    logoBox: {
        display: 'flex',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': { opacity: 0.9 },
        position: 'absolute'
    },
    uniteTypography: {
        fontWeight: 900,
        letterSpacing: '-2px',
        fontSize: { xs: '1.62rem', md: '2.16rem' },
        lineHeight: 1
    },
    hereTypography: {
        fontWeight: 900,
        letterSpacing: '-2px',
        color: '#000',
        fontSize: { xs: '1.62rem', md: '2.16rem' },
        lineHeight: 1,
        ml: 0.5
    },
    exclamationTypography: {
        fontWeight: 900,
        letterSpacing: '-2px',
        fontSize: { xs: '1.62rem', md: '2.16rem' },
        lineHeight: 1
    },
    rightColumn: {
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 0,
        marginLeft: 'auto'
    },
    secondaryRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 0,
        width: '100%',
        minHeight: 48
    },
    mainRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 0,
        minHeight: 50,
        width: '100%'
    },
    secondaryButton: {
        color: '#1e1b1bff',
        fontWeight: 900,
        textTransform: 'uppercase',
        fontSize: '0.77em',
        '&:hover': {
            color: '#ffd700',
            backgroundColor: 'transparent'
        }
    },
    socialStack: {
        ml: 0
    },
    socialIconButton: {
        color: '#fff',
        '&:hover': {
            color: '#ffd700',
            transform: 'scale(1.1)'
        }
    },
    mainNavButton: {
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.855rem',
        textTransform: 'uppercase',
        px: 2,
        minWidth: 'auto',
        '&:hover': {
            color: '#ffd700',
            backgroundColor: 'transparent'
        }
    },
    drawerBox: {
        width: 280,
        pt: 2,
        bgcolor: '#b00000'
    },
    drawerCloseBox: {
        display: 'flex',
        justifyContent: 'flex-end',
        px: 2
    },
    drawerList: {
        px: 2
    },
    drawerListItemButton: {
        color: '#fff',
        py: 1.8,
        '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
        fontWeight: 700
    },
    mobileHamburger: {
        display: { md: 'none' },
        ml: 'auto'
    }
};

const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { t, i18n } = useTranslation('navbar');
    const isSpanish = i18n.language === 'es';
    const handleLanguageToggle = () => {
        i18n.changeLanguage(isSpanish ? 'en' : 'es');
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={styles.drawerBox} role="presentation">
            <Box sx={styles.drawerCloseBox}>
                <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <List sx={styles.drawerList}>
                {navData.map((item) => (
                    <ListItemButton
                        key={item.href}
                        component="a"
                        href={item.href}
                        onClick={handleDrawerToggle}
                        sx={styles.drawerListItemButton}>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky" sx={styles.appBar}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={styles.toolbar}>
                        {/* Logo */}
                        <Box component="a" href="/" sx={styles.logoBox}>
                            <Typography variant="h3" component="span" sx={styles.uniteTypography}>
                                UNITE
                            </Typography>
                            <Typography variant="h3" component="span" sx={styles.hereTypography}>
                                HERE
                            </Typography>
                            <Typography
                                variant="h3"
                                component="span"
                                sx={styles.exclamationTypography}>
                                !
                            </Typography>
                        </Box>

                        {/* Menus */}
                        <Box sx={styles.rightColumn}>
                            {/* Secondary menu */}
                            <Box sx={styles.secondaryRow}>
                                <Stack direction="row" spacing={1}>
                                    {secondaryNavData.map((item) => (
                                        <Button
                                            key={item.href}
                                            component="a"
                                            href={item.href}
                                            sx={styles.secondaryButton}>
                                            {t(item.labelKey)}
                                        </Button>
                                    ))}

                                    {/* Language toggle — separate from nav links */}
                                    <Button
                                        onClick={handleLanguageToggle}
                                        sx={styles.secondaryButton}>
                                        {isSpanish
                                            ? t('secondary.switchToEnglish')
                                            : t('secondary.switchToSpanish')}
                                    </Button>
                                </Stack>

                                {/* Social Media Icons */}
                                <Stack direction="row" sx={styles.socialStack}>
                                    {socialLinks.map((social) => (
                                        <IconButton
                                            key={social.label}
                                            component="a"
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={styles.socialIconButton}
                                            aria-label={social.label}>
                                            {social.icon}
                                        </IconButton>
                                    ))}
                                </Stack>
                            </Box>

                            {/* Main navigation */}
                            <Box sx={styles.mainRow}>
                                {navData.map((item, index) => {
                                    // Special case: search icon (from mock API)
                                    if (item.iconKey) {
                                        const IconComponent = iconMap[item.iconKey];
                                        return (
                                            <Button
                                                key={item.href || index}
                                                component="a"
                                                href={item.href}
                                                sx={styles.mainNavButton}>
                                                {IconComponent}
                                            </Button>
                                        );
                                    }

                                    // Dropdown item
                                    if (item.submenu) {
                                        return (
                                            <NavDropdown
                                                key={item.href || index}
                                                label={t(item.label)}
                                                href={item.href}
                                                submenu={item.submenu.map((sub) => ({
                                                    ...sub,
                                                    label: t(sub.label)
                                                }))}
                                            />
                                        );
                                    }

                                    // Regular button
                                    return (
                                        <Button
                                            key={item.href || index}
                                            component="a"
                                            href={item.href}
                                            sx={styles.mainNavButton}>
                                            {t(item.label)}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Box>

                        {/* Mobile Hamburger */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={styles.mobileHamburger}>
                            <MenuIcon sx={{ fontSize: 34 }} />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}>
                {drawer}
            </Drawer>
        </>
    );
};

export default NavBar;
