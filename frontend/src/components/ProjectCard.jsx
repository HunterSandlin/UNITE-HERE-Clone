import { Box, Typography } from '@mui/material';

const cardStyles = {
    root: {
        position: 'relative',
        flexShrink: 0,
        width: 'calc((100% - 10px) / 3)',
        aspectRatio: '3.8 / 4',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ccc',
        textDecoration: 'none',
        display: 'block',
        overflow: 'hidden'
    },
    titleBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(205, 14, 17, 0.8)',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '14px',
        paddingBottom: '14px'
    },
    titleText: {
        color: '#ffffff',
        fontWeight: 700,
        fontSize: '1.05rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        lineHeight: 1.5,
        display: 'inline',
        borderBottom: '4px solid #000000',
        boxDecorationBreak: 'clone', // standard property
        WebkitBoxDecorationBreak: 'clone' // Safari prefix
    }
};

const ProjectCard = ({ title, image, href }) => (
    <Box
        component="a"
        href={href}
        sx={{
            ...cardStyles.root,
            backgroundImage: `url(${image})`
        }}>
        <Box sx={cardStyles.titleBar}>
            <Typography component="span" sx={cardStyles.titleText}>
                {title}
            </Typography>
        </Box>
    </Box>
);

export default ProjectCard;
