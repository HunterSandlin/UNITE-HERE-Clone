import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChangingLives from 'src/components/ChangingLives/ChangingLives';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: { language: 'en' }
    })
}));

vi.mock('src/components/Card/Card', () => ({
    default: ({ title, href, variant }) => (
        <a href={href} data-variant={variant} data-testid="mock-card">
            {title}
        </a>
    )
}));

const makeItems = (count) =>
    Array.from({ length: count }, (_, i) => ({
        titleKey: `item.title${i}`,
        image: `https://example.com/img${i}.jpg`,
        href: `/changing-lives/${i}`
    }));

describe('ChangingLives', () => {
    describe('Left panel', () => {
        it('renders the section title from translation key', () => {
            render(<ChangingLives items={makeItems(3)} />);
            expect(screen.getByText('changingLives.label')).toBeInTheDocument();
        });

        it('renders the description from translation key', () => {
            render(<ChangingLives items={makeItems(3)} />);
            expect(screen.getByText('changingLives.description')).toBeInTheDocument();
        });

        it('renders the Learn More button from translation key', () => {
            render(<ChangingLives items={makeItems(3)} />);
            expect(screen.getByText('changingLives.learnMore')).toBeInTheDocument();
        });

        it('Learn More button links to /changing-lives', () => {
            render(<ChangingLives items={makeItems(3)} />);
            const btn = screen.getByText('changingLives.learnMore').closest('a');
            expect(btn).toHaveAttribute('href', '/changing-lives');
        });
    });

    describe('Carousel rendering', () => {
        it('renders exactly 3 cards at once', () => {
            render(<ChangingLives items={makeItems(3)} />);
            expect(screen.getAllByTestId('mock-card')).toHaveLength(3);
        });

        it('renders fewer than 3 cards when fewer items are passed', () => {
            render(<ChangingLives items={makeItems(2)} />);
            expect(screen.getAllByTestId('mock-card')).toHaveLength(2);
        });

        it('renders Previous and Next arrow buttons', () => {
            render(<ChangingLives items={makeItems(3)} />);
            expect(screen.getByLabelText('Previous')).toBeInTheDocument();
            expect(screen.getByLabelText('Next')).toBeInTheDocument();
        });

        it('passes changingLives variant to Card', () => {
            render(<ChangingLives items={makeItems(3)} />);
            screen.getAllByTestId('mock-card').forEach((card) => {
                expect(card).toHaveAttribute('data-variant', 'changingLives');
            });
        });

        it('passes translated titleKey to Card as title', () => {
            render(<ChangingLives items={makeItems(3)} />);
            expect(screen.getByText('item.title0')).toBeInTheDocument();
        });

        it('passes correct href to Card', () => {
            render(<ChangingLives items={makeItems(3)} />);
            expect(screen.getByText('item.title0').closest('a')).toHaveAttribute(
                'href',
                '/changing-lives/0'
            );
        });
    });

    describe('Carousel navigation', () => {
        it('advances to next cards when Next is clicked', () => {
            render(<ChangingLives items={makeItems(6)} />);
            expect(screen.getByText('item.title0')).toBeInTheDocument();

            fireEvent.click(screen.getByLabelText('Next'));

            expect(screen.getByText('item.title3')).toBeInTheDocument();
            expect(screen.queryByText('item.title0')).not.toBeInTheDocument();
        });

        it('goes back to previous cards when Previous is clicked', () => {
            render(<ChangingLives items={makeItems(6)} />);
            fireEvent.click(screen.getByLabelText('Next'));
            fireEvent.click(screen.getByLabelText('Previous'));
            expect(screen.getByText('item.title0')).toBeInTheDocument();
        });

        it('wraps forward when Next is clicked past the last item', () => {
            render(<ChangingLives items={makeItems(3)} />);
            fireEvent.click(screen.getByLabelText('Next'));
            expect(screen.getByText('item.title0')).toBeInTheDocument();
        });

        it('wraps backward when Previous is clicked from the first item', () => {
            render(<ChangingLives items={makeItems(6)} />);
            fireEvent.click(screen.getByLabelText('Previous'));
            expect(screen.getByText('item.title5')).toBeInTheDocument();
        });

        it('returns to start after cycling through all items', () => {
            render(<ChangingLives items={makeItems(6)} />);
            for (let i = 0; i < 6; i++) {
                fireEvent.click(screen.getByLabelText('Next'));
            }
            expect(screen.getByText('item.title0')).toBeInTheDocument();
        });
    });

    describe('Default data', () => {
        it('renders without crashing when no items prop is passed', () => {
            expect(() => render(<ChangingLives />)).not.toThrow();
        });

        it('still shows 3 cards with default data', () => {
            render(<ChangingLives />);
            expect(screen.getAllByTestId('mock-card')).toHaveLength(3);
        });
    });
});
