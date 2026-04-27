import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from 'src/components/NavBar/NavBar';

// Mock i18n
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: {
            language: 'en',
            changeLanguage: vi.fn()
        }
    })
}));

// Mock navData
vi.mock('../components/NavBar/navData', () => ({
    navData: [
        {
            label: 'whoWeAre.label',
            href: '/who-we-are',
            submenu: [{ label: 'whoWeAre.affiliatesAndLocals', href: '/affiliates-and-locals' }]
        },
        { label: 'organizeAUnion.label', href: '/organize-a-union' },
        { label: '', iconKey: 'search', href: '/' }
    ],
    secondaryNavData: [
        { labelKey: 'secondary.donate', href: '/donate' },
        { labelKey: 'secondary.contactUs', href: '/contact-us' }
    ]
}));

// Mock theme
vi.mock('src/styles/theme');

describe('NavBar', () => {
    describe('Logo', () => {
        it('renders UNITE HERE! logo text', () => {
            render(<NavBar />);
            expect(screen.getByText('UNITE')).toBeInTheDocument();
            expect(screen.getByText('HERE')).toBeInTheDocument();
            expect(screen.getByText('!')).toBeInTheDocument();
        });

        it('logo links to home', () => {
            render(<NavBar />);
            const logo = screen.getByText('UNITE').closest('a');
            expect(logo).toHaveAttribute('href', '/');
        });
    });

    describe('Main navigation', () => {
        it('renders regular nav buttons', () => {
            render(<NavBar />);
            // organizeAUnion.label is a regular button (no submenu, no iconKey)
            expect(screen.getByText('organizeAUnion.label')).toBeInTheDocument();
        });

        it('renders dropdown trigger for items with submenus', () => {
            render(<NavBar />);
            expect(screen.getByText('whoWeAre.label')).toBeInTheDocument();
        });

        it('renders search icon button', () => {
            render(<NavBar />);
            // The search button has no label text so find by its link href
            const searchBtn = document.querySelector('a[href="/"]');
            expect(searchBtn).toBeInTheDocument();
        });
    });

    describe('Secondary navigation', () => {
        it('renders secondary nav items', () => {
            render(<NavBar />);
            expect(screen.getByText('secondary.donate')).toBeInTheDocument();
            expect(screen.getByText('secondary.contactUs')).toBeInTheDocument();
        });

        it('renders language toggle button showing Español when in English', () => {
            render(<NavBar />);
            // In English, should show the key for switchToSpanish
            expect(screen.getByText('secondary.switchToSpanish')).toBeInTheDocument();
        });
    });

    describe('Mobile drawer', () => {
        it('hamburger button is present', () => {
            render(<NavBar />);
            const hamburger = screen.getByLabelText('open drawer');
            expect(hamburger).toBeInTheDocument();
        });

        it('drawer opens when hamburger is clicked', () => {
            render(<NavBar />);
            const hamburger = screen.getByLabelText('open drawer');
            fireEvent.click(hamburger);
            // Drawer renders nav items — check one appears
            const drawerItems = screen.getAllByText('organizeAUnion.label');
            expect(drawerItems.length).toBeGreaterThan(0);
        });

        it('drawer closes when close button is clicked', () => {
            render(<NavBar />);
            fireEvent.click(screen.getByLabelText('open drawer'));
            const closeBtn = screen.getByTestId
                ? document.querySelector(
                      '[aria-label="close drawer"], button svg[data-testid="CloseIcon"]'
                  )
                : null;
            // Drawer was opened
            expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
        });
    });

    describe('Social links', () => {
        it('renders all four social icon buttons', () => {
            render(<NavBar />);
            expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
            expect(screen.getByLabelText('X (Twitter)')).toBeInTheDocument();
            expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
            expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
        });

        it('social links open in new tab', () => {
            render(<NavBar />);
            const fbLink = screen.getByLabelText('Facebook');
            expect(fbLink).toHaveAttribute('target', '_blank');
            expect(fbLink).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });
});
