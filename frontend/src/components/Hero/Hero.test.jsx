import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from 'src/components/Hero/Hero';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: { language: 'en' }
    })
}));

describe('Hero', () => {
    describe('Image', () => {
        it('renders the hero image with default src', () => {
            render(<Hero />);
            expect(screen.getByAltText('UNITE HERE workers')).toHaveAttribute(
                'src',
                '/hero/hero-11.jpg'
            );
        });

        it('renders with a custom imageSrc prop', () => {
            render(<Hero imageSrc="/hero/custom.jpg" imageAlt="Custom alt" />);
            expect(screen.getByAltText('Custom alt')).toHaveAttribute('src', '/hero/custom.jpg');
        });

        it('renders with a custom imageAlt prop', () => {
            render(<Hero imageAlt="Workers on strike" />);
            expect(screen.getByAltText('Workers on strike')).toBeInTheDocument();
        });

        it('hides the image when it fails to load', () => {
            render(<Hero />);
            const img = screen.getByAltText('UNITE HERE workers');
            img.dispatchEvent(new Event('error'));
            expect(img.style.display).toBe('none');
        });
    });

    describe('Headline', () => {
        it('renders headline line 1 from translation key', () => {
            render(<Hero />);
            expect(screen.getByText('hero.headline1')).toBeInTheDocument();
        });

        it('renders headline line 2 from translation key', () => {
            render(<Hero />);
            expect(screen.getByText('hero.headline2')).toBeInTheDocument();
        });
    });

    describe('CTA', () => {
        it('renders the CTA text from translation key', () => {
            render(<Hero />);
            expect(screen.getByText('hero.ctaText')).toBeInTheDocument();
        });
    });

    describe('Rendering', () => {
        it('renders without crashing with default props', () => {
            expect(() => render(<Hero />)).not.toThrow();
        });

        it('renders without crashing with all props provided', () => {
            expect(() => render(<Hero imageSrc="/test.jpg" imageAlt="Test" />)).not.toThrow();
        });
    });
});
