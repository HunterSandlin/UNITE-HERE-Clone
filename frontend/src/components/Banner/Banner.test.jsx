import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Banner from 'src/components/Banner/Banner';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: { language: 'en' }
    })
}));

describe('Banner', () => {
    describe('Default props', () => {
        it('renders without crashing with default props', () => {
            expect(() => render(<Banner />)).not.toThrow();
        });

        it('renders title from default translation key', () => {
            render(<Banner />);
            expect(screen.getByText('newsletter.title')).toBeInTheDocument();
        });

        it('renders description from default translation key', () => {
            render(<Banner />);
            expect(screen.getByText('newsletter.description')).toBeInTheDocument();
        });

        it('renders button from default translation key', () => {
            render(<Banner />);
            expect(screen.getByText('newsletter.button')).toBeInTheDocument();
        });

        it('button links to default href', () => {
            render(<Banner />);
            const btn = screen.getByText('newsletter.button').closest('a');
            expect(btn).toHaveAttribute('href', '/subscribe-to-updates');
        });
    });

    describe('Custom props', () => {
        const customProps = {
            imageSrc: '/custom/image.jpg',
            titleKey: 'custom.title',
            descriptionKey: 'custom.description',
            buttonKey: 'custom.button',
            buttonHref: '/custom-href'
        };

        it('renders title from custom translation key', () => {
            render(<Banner {...customProps} />);
            expect(screen.getByText('custom.title')).toBeInTheDocument();
        });

        it('renders description from custom translation key', () => {
            render(<Banner {...customProps} />);
            expect(screen.getByText('custom.description')).toBeInTheDocument();
        });

        it('renders button text from custom translation key', () => {
            render(<Banner {...customProps} />);
            expect(screen.getByText('custom.button')).toBeInTheDocument();
        });

        it('button links to custom href', () => {
            render(<Banner {...customProps} />);
            const btn = screen.getByText('custom.button').closest('a');
            expect(btn).toHaveAttribute('href', '/custom-href');
        });
    });

    describe('Content structure', () => {
        it('renders the title as an h2', () => {
            render(<Banner />);
            const heading = screen.getByRole('heading', { level: 2 });
            expect(heading).toHaveTextContent('newsletter.title');
        });

        it('renders the subscribe button as a link', () => {
            render(<Banner />);
            const btn = screen.getByText('newsletter.button').closest('a');
            expect(btn).toBeInTheDocument();
        });
    });
});
