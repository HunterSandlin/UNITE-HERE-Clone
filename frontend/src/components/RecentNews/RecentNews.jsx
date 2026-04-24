import { Box, Typography, Link } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useTranslation } from 'react-i18next';
import { fontFamily, brandColors } from 'src/styles/theme';
import defaultNewsData from 'src/mockData/recentnewsdata.json';

const TITLE_LINE_HEIGHT_PX = 35;
const TITLE_RECT_RATIO = 0.35;

const styles = {
    root: {
        paddingTop: { xs: '2rem', md: '3rem' },
        paddingBottom: { xs: '2rem', md: '3rem' },
        paddingLeft: { xs: '1rem', md: '110px' },
        paddingRight: { xs: '1rem', md: '110px' },
        marginBottom: '40px',
        overflow: 'hidden'
    },
    titleWrapper: {
        position: 'relative',
        display: 'inline-block',
        marginBottom: '1.5rem'
    },
    titleRect: {
        position: 'absolute',
        bottom: -2,
        left: 0,
        right: 0,
        height: `${Math.round(TITLE_LINE_HEIGHT_PX * TITLE_RECT_RATIO)}px`,
        backgroundColor: 'rgba(200, 200, 200, 0.75)'
    },
    titleText: {
        position: 'relative',
        fontWeight: 300,
        fontSize: '1.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily,
        color: '#1a1a1a',
        lineHeight: `${TITLE_LINE_HEIGHT_PX}px`
    },
    featuredItem: {
        display: 'flex',
        gap: '2rem',
        marginBottom: '2rem',
        alignItems: 'flex-start',
        padding: '20px'
    },
    featuredImage: {
        flexShrink: 0,
        width: { xs: '120px', md: '250px' },
        height: { xs: '80px', md: '130px' },
        objectFit: 'cover',
        display: 'block'
    },
    featuredImagePlaceholder: {
        flexShrink: 0,
        width: { xs: '120px', md: '250px' },
        height: { xs: '80px', md: '130px' },
        backgroundColor: '#eee'
    },
    featuredContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    featuredTitle: {
        fontFamily,
        fontWeight: 700,
        fontSize: { xs: '1.1rem', md: '1.5rem' },
        lineHeight: 1.3,
        color: '#1a1a1a',
        textDecoration: 'none',
        '&:hover': { color: brandColors.redLight }
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 0
    },
    gridItem: {
        display: 'flex',
        padding: '30px',
        margin: '20px',
        gap: '1rem',
        alignItems: 'flex-start',
        position: 'relative',
        // Uses CSS to make line, original website uses a png
        backgroundImage: `linear-gradient(to right, ${brandColors.redLight} 60px, #ddd 60px)`,
        backgroundSize: '100% 2px',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat'
    },
    gridImage: {
        width: '120px',
        height: '80px'
    },
    gridImagePlaceholder: {
        width: '120px',
        height: '80px',
        backgroundColor: '#eee'
    },
    gridContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    gridTitle: {
        fontFamily,
        fontWeight: 700,
        fontSize: '0.95rem',
        lineHeight: 1.35,
        color: '#1a1a1a',
        textDecoration: 'none',
        '&:hover': { color: brandColors.redLight }
    },
    meta: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center'
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: '#888',
        fontSize: '0.78rem',
        fontFamily
    },
    metaIcon: {
        fontSize: '0.85rem',
        color: '#aaa'
    },
    viewAll: {
        display: 'block',
        marginTop: '1.5rem',
        color: brandColors.redLight,
        fontFamily,
        fontSize: '0.95rem',
        textDecoration: 'none',
        '&:hover': { textDecoration: 'underline' }
    }
};

// Info under tilte, used in featured and regular news items
const NewsMeta = ({ type, typePrefix, date }) => (
    <Box sx={styles.meta}>
        {typePrefix && (
            <Typography component="span" sx={styles.metaItem}>
                {typePrefix}
            </Typography>
        )}
        <Box sx={styles.metaItem}>
            <ArticleOutlinedIcon sx={styles.metaIcon} />
            {type}
        </Box>
        <Box sx={styles.metaItem}>
            <CalendarTodayOutlinedIcon sx={styles.metaIcon} />
            {date}
        </Box>
    </Box>
);

// Large news item at the top
const FeaturedNewsItem = ({ title, href, image, type, typePrefix, date }) => (
    <Box sx={styles.featuredItem}>
        {image && <Box component="img" src={image} alt={title} sx={styles.featuredImage} />}
        <Box sx={styles.featuredContent}>
            <Link href={href} sx={styles.featuredTitle}>
                {title}
            </Link>
            <NewsMeta type={type} typePrefix={typePrefix} date={date} />
        </Box>
    </Box>
);

// Small news items in a grid
const GridNewsItem = ({ title, href, image, type, typePrefix, date }) => (
    <Box sx={styles.gridItem}>
        {image && <Box component="img" src={image} alt={title} sx={styles.gridImage} />}
        <Box sx={styles.gridContent}>
            <Link href={href} sx={styles.gridTitle}>
                {title}
            </Link>
            <NewsMeta type={type} typePrefix={typePrefix} date={date} />
        </Box>
    </Box>
);

const RecentNews = ({ articles = defaultNewsData }) => {
    const { i18n } = useTranslation();

    // Hide component if in es, like original site
    if (i18n.language === 'es') return null;

    const featured = articles.find((a) => a.featured);
    const grid = articles.filter((a) => !a.featured).slice(0, 4);

    return (
        <Box sx={styles.root}>
            <Box sx={styles.titleWrapper}>
                <Box sx={styles.titleRect} />
                <Typography component="h2" sx={styles.titleText}>
                    Recent News
                </Typography>
            </Box>

            {featured && <FeaturedNewsItem {...featured} />}

            <Box sx={styles.grid}>
                {grid.map((article) => (
                    <GridNewsItem key={article.id} {...article} />
                ))}
            </Box>

            <Link href="/newsroom" sx={styles.viewAll}>
                View all »
            </Link>
        </Box>
    );
};

export default RecentNews;
