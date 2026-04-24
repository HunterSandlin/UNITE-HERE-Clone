import { Box, Typography } from '@mui/material';
import { fontFamily, brandColors, textColors } from 'src/styles/theme';

const VARIANTS = {
    project: {
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
            fontFamily,
            lineHeight: 1.5,
            display: 'inline',
            borderBottom: '4px solid #000000',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone'
        }
    },
    changingLives: {
        root: {
            position: 'relative',
            width: 'calc((100% - 10px) / 3)',
            aspectRatio: '4 / 4.2',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'block',
            overflow: 'hidden'
        },
        titleBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderLeft: `4px solid ${brandColors.redLight}`
        },
        titleText: {
            color: textColors.greyDark,
            fontWeight: 600,
            fontSize: '1.2rem',
            padding: '8px',
            fontFamily,
            lineHeight: 1.4,
            display: 'block'
        }
    }
};

/**
 * @param {string}  [variant]      - Style optoins, "project" and "changingLives"
 *                                      or overwrite with custom styles:
 * @param {string}  title          - The card title text (should be a pre-translated string)
 * @param {string}  image          - URL of the background image
 * @param {string}  href           - Link destination
 *                                      - Defaults to "project"
 * @param {object}  [sx]           - Per-slot style overrides. Merged on top of the active
 *                                   variant. Supports the following slots:
 *                                      - sx.root, sx.titleBar, and sx.titleText
 */
const Card = ({ title, image, href, variant = 'project', sx = {} }) => {
    const base = VARIANTS[variant] ?? VARIANTS.project;

    const rootStyles = { ...base.root, ...sx.root };
    const barStyles = { ...base.titleBar, ...sx.titleBar };
    const textStyles = { ...base.titleText, ...sx.titleText };

    return (
        <Box component="a" href={href} sx={{ ...rootStyles, backgroundImage: `url(${image})` }}>
            <Box sx={barStyles}>
                <Typography component="span" sx={textStyles}>
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};

export default Card;
