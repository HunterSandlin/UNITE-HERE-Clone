import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Projects from 'src/components/Projects/Projects';

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

const makeProjects = (count) =>
    Array.from({ length: count }, (_, i) => ({
        titleKey: `project.title${i}`,
        image: `https://example.com/img${i}.jpg`,
        href: `/project/${i}`
    }));

describe('Projects', () => {
    describe('Section header', () => {
        it('renders the Projects section title', () => {
            render(<Projects projects={makeProjects(6)} />);
            expect(screen.getByText('projects.label')).toBeInTheDocument();
        });
    });

    describe('Carousel rendering', () => {
        it('renders exactly 3 cards at once', () => {
            render(<Projects projects={makeProjects(6)} />);
            expect(screen.getAllByTestId('mock-card')).toHaveLength(3);
        });

        it('renders previous and next arrow buttons', () => {
            render(<Projects projects={makeProjects(6)} />);
            expect(screen.getByLabelText('Previous projects')).toBeInTheDocument();
            expect(screen.getByLabelText('Next projects')).toBeInTheDocument();
        });

        it('passes project variant to Card', () => {
            render(<Projects projects={makeProjects(6)} />);
            screen.getAllByTestId('mock-card').forEach((card) => {
                expect(card).toHaveAttribute('data-variant', 'project');
            });
        });

        it('passes translated titleKey to Card as title', () => {
            render(<Projects projects={makeProjects(3)} />);
            expect(screen.getByText('project.title0')).toBeInTheDocument();
        });

        it('passes correct href to Card', () => {
            render(<Projects projects={makeProjects(3)} />);
            expect(screen.getByText('project.title0').closest('a')).toHaveAttribute(
                'href',
                '/project/0'
            );
        });
    });

    describe('Carousel navigation', () => {
        it('advances to next cards when next is clicked', () => {
            render(<Projects projects={makeProjects(6)} />);
            expect(screen.getByText('project.title0')).toBeInTheDocument();

            fireEvent.click(screen.getByLabelText('Next projects'));

            expect(screen.getByText('project.title3')).toBeInTheDocument();
            expect(screen.queryByText('project.title0')).not.toBeInTheDocument();
        });

        it('goes back to previous cards when prev is clicked', () => {
            render(<Projects projects={makeProjects(6)} />);
            fireEvent.click(screen.getByLabelText('Next projects'));
            fireEvent.click(screen.getByLabelText('Previous projects'));
            expect(screen.getByText('project.title0')).toBeInTheDocument();
        });

        it('wraps forward when next is clicked past the last project', () => {
            render(<Projects projects={makeProjects(3)} />);
            fireEvent.click(screen.getByLabelText('Next projects'));
            expect(screen.getByText('project.title0')).toBeInTheDocument();
        });

        it('wraps backward when prev is clicked from the first project', () => {
            render(<Projects projects={makeProjects(6)} />);
            fireEvent.click(screen.getByLabelText('Previous projects'));
            expect(screen.getByText('project.title5')).toBeInTheDocument();
        });

        it('returns to start after cycling through all projects', () => {
            render(<Projects projects={makeProjects(6)} />);
            for (let i = 0; i < 6; i++) {
                fireEvent.click(screen.getByLabelText('Next projects'));
            }
            expect(screen.getByText('project.title0')).toBeInTheDocument();
        });
    });

    describe('Default data', () => {
        it('renders without crashing when no projects prop is passed', () => {
            expect(() => render(<Projects />)).not.toThrow();
        });

        it('still shows 3 cards with default data', () => {
            render(<Projects />);
            expect(screen.getAllByTestId('mock-card')).toHaveLength(3);
        });
    });

    describe('Edge cases', () => {
        it('renders without crashing with exactly 3 projects', () => {
            expect(() => render(<Projects projects={makeProjects(3)} />)).not.toThrow();
        });

        it('renders without crashing with more than 3 projects', () => {
            expect(() => render(<Projects projects={makeProjects(10)} />)).not.toThrow();
        });
    });
});
