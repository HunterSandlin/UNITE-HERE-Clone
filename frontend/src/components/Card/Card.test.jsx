import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from 'src/components/Card/Card';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key, i18n: { language: 'en' } })
}));

const baseProps = {
    title: 'Test Card Title',
    image: 'https://example.com/image.jpg',
    href: '/test-href'
};

describe('Card', () => {
    describe('Rendering', () => {
        it('renders the title text', () => {
            render(<Card {...baseProps} />);
            expect(screen.getByText('Test Card Title')).toBeInTheDocument();
        });

        it('renders as a link with the correct href', () => {
            render(<Card {...baseProps} />);
            expect(screen.getByRole('link')).toHaveAttribute('href', '/test-href');
        });

        it('renders without crashing with all props', () => {
            expect(() => render(<Card {...baseProps} />)).not.toThrow();
        });
    });

    describe('Variants', () => {
        it('defaults to the project variant', () => {
            render(<Card {...baseProps} />);
            expect(screen.getByText('Test Card Title')).toBeInTheDocument();
        });

        it('renders the changingLives variant without crashing', () => {
            render(<Card {...baseProps} variant="changingLives" />);
            expect(screen.getByText('Test Card Title')).toBeInTheDocument();
        });

        it('falls back to project variant for an unknown variant name', () => {
            render(<Card {...baseProps} variant="doesNotExist" />);
            expect(screen.getByText('Test Card Title')).toBeInTheDocument();
        });

        it('renders a link for both variants', () => {
            const { rerender } = render(<Card {...baseProps} variant="project" />);
            expect(screen.getByRole('link')).toBeInTheDocument();

            rerender(<Card {...baseProps} variant="changingLives" />);
            expect(screen.getByRole('link')).toBeInTheDocument();
        });
    });

    describe('sx overrides', () => {
        it('accepts sx overrides without crashing', () => {
            expect(() =>
                render(
                    <Card
                        {...baseProps}
                        sx={{
                            root: { backgroundColor: 'pink' },
                            titleBar: { paddingLeft: '99px' },
                            titleText: { fontSize: '99rem' }
                        }}
                    />
                )
            ).not.toThrow();
        });

        it('still renders correct title with sx overrides applied', () => {
            render(<Card {...baseProps} sx={{ titleText: { color: 'blue' } }} />);
            expect(screen.getByText('Test Card Title')).toBeInTheDocument();
        });

        it('merges sx.root without losing the href', () => {
            render(<Card {...baseProps} sx={{ root: { opacity: 0.5 } }} />);
            expect(screen.getByRole('link')).toHaveAttribute('href', '/test-href');
        });
    });

    describe('Edge cases', () => {
        it('renders with an empty title without crashing', () => {
            render(<Card {...baseProps} title="" />);
            expect(screen.getByRole('link')).toBeInTheDocument();
        });

        it('renders with no image without crashing', () => {
            render(<Card {...baseProps} image="" />);
            expect(screen.getByRole('link')).toBeInTheDocument();
        });

        it('renders with no image without crashing', () => {
            render(<Card {...baseProps} image={null} />);
            expect(screen.getByRole('link')).toBeInTheDocument();
        });
    });
});
