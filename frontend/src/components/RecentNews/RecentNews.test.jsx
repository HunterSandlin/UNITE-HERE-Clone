import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecentNews from 'src/components/RecentNews/RecentNews';
import newsData from 'src/mockData/recentnewsdata.json';

// Mock i18n with ability to change language
const mockI18n = { language: 'en' };
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: mockI18n
    })
}));

const featured = newsData.find((a) => a.featured);
const gridArticles = newsData.filter((a) => !a.featured);
const articleWithNoImage = newsData.find((a) => !a.image);
const articleWithTypePrefix = newsData.find((a) => a.typePrefix);
// extra article of edge case testing
const extraArticle = {
    id: 99,
    title: 'Extra Article Should Not Appear',
    href: '/extra',
    image: null,
    type: 'Posts',
    date: 'April 1, 2026',
    featured: false
};

describe('RecentNews', () => {
    describe('Section header', () => {
        it('renders the Recent News heading', () => {
            render(<RecentNews articles={newsData} />);
            expect(screen.getByText('Recent News')).toBeInTheDocument();
        });

        it('renders the View all link pointing to /newsroom', () => {
            render(<RecentNews articles={newsData} />);
            const viewAll = screen.getByText('View all »');
            expect(viewAll).toBeInTheDocument();
            expect(viewAll.closest('a')).toHaveAttribute('href', '/newsroom');
        });
    });

    describe('Featured article', () => {
        it('renders the featured article title', () => {
            render(<RecentNews articles={newsData} />);
            expect(screen.getByText(featured.title)).toBeInTheDocument();
        });

        it('featured article title links to its href', () => {
            render(<RecentNews articles={newsData} />);
            const link = screen.getByText(featured.title).closest('a');
            expect(link).toHaveAttribute('href', featured.href);
        });

        it('renders the featured article image with correct src', () => {
            render(<RecentNews articles={newsData} />);
            const img = screen.getByAltText(featured.title);
            expect(img).toHaveAttribute('src', featured.image);
        });

        it('renders the featured article type in metadata', () => {
            render(<RecentNews articles={newsData} />);
            // Could be multiple elements with this type label so using getAllByText
            const typeLabels = screen.getAllByText(featured.type);
            expect(typeLabels.length).toBeGreaterThan(0);
        });

        it('renders the featured article date in metadata', () => {
            render(<RecentNews articles={newsData} />);
            expect(screen.getByText(featured.date)).toBeInTheDocument();
        });
    });

    describe('Grid articles', () => {
        it('renders all non-featured articles from the data', () => {
            render(<RecentNews articles={newsData} />);
            gridArticles.slice(0, 4).forEach((article) => {
                expect(screen.getByText(article.title)).toBeInTheDocument();
            });
        });

        it('renders typePrefix when provided', () => {
            render(<RecentNews articles={newsData} />);
            expect(screen.getByText(articleWithTypePrefix.typePrefix)).toBeInTheDocument();
        });

        it('renders images for articles that have one', () => {
            render(<RecentNews articles={newsData} />);
            const articleWithImage = gridArticles.find((a) => a.image);
            const img = screen.getByAltText(articleWithImage.title);
            expect(img).toHaveAttribute('src', articleWithImage.image);
        });

        it('does not render an img element for articles with null image', () => {
            render(<RecentNews articles={newsData} />);
            expect(screen.queryByAltText(articleWithNoImage.title)).not.toBeInTheDocument();
        });

        it('shows at most 4 grid articles even when more are passed', () => {
            render(<RecentNews articles={[...newsData, extraArticle]} />);
            expect(screen.queryByText(extraArticle.title)).not.toBeInTheDocument();
        });
    });

    describe('Spanish language behaviour', () => {
        it('renders nothing when language is Spanish', () => {
            mockI18n.language = 'es';
            const { container } = render(<RecentNews articles={newsData} />);
            expect(container.firstChild).toBeNull();
            mockI18n.language = 'en';
        });
    });

    describe('Edge cases', () => {
        it('renders without crashing when articles array is empty', () => {
            render(<RecentNews articles={[]} />);
            expect(screen.getByText('Recent News')).toBeInTheDocument();
        });

        it('renders without crashing when no article is marked featured', () => {
            const noFeatured = newsData.map((a) => ({ ...a, featured: false }));
            render(<RecentNews articles={noFeatured} />);
            expect(screen.getByText('Recent News')).toBeInTheDocument();
        });

        it('renders without crashing when using default prop data', () => {
            expect(() => render(<RecentNews />)).not.toThrow();
        });

        it('renders without crashing when typePrefix is missing from an article', () => {
            const articleWithoutPrefix = newsData.find((a) => !a.typePrefix);
            expect(() =>
                render(<RecentNews articles={[{ ...articleWithoutPrefix, featured: true }]} />)
            ).not.toThrow();
        });
    });
});
