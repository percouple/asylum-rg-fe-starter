import { render, screen } from '@testing-library/react';
import { LandingPage } from '../components/pages/Landing';



describe('Landing Page components render', () => {

    beforeEach(() => {
        render(<LandingPage/>);
    });

    test('[1] Graphs appear on screen', async () => {

        // screen.debug();
        const byOfficeGraph = await screen.findByAltText('Grant Rates By Office Graph');
        const byNationalityGraph = await screen.findByAltText('Grant Rates By Nationality Graph');
        const ratesOverTimeGraph = await screen.findByAltText('Grant Rates Over Time Graph');

        expect(byOfficeGraph).toBeVisible();
        expect(byNationalityGraph).toBeVisible();
        expect(ratesOverTimeGraph).toBeVisible();

    });

    test('[2] Buttons appear on screen', async () => {

        const viewTheDataButton = await screen.findByText('View the Data');
        const downloadTheDataButton = await screen.findByText('Download the Data');
        const readMoreButton = await screen.findByText('Read More');
        const backToTopButton = await screen.findByText('Back To Top');
        
        expect(viewTheDataButton).toBeVisible();
        expect(downloadTheDataButton).toBeVisible();
        expect(readMoreButton).toBeVisible();
        expect(backToTopButton).toBeVisible();
    });

    test('[3] Disparity Insights section appears on screen', async () => {

        expect(await screen.findByText('Systemic Disparity Insights')).toBeVisible();
        expect(await screen.findByText(''))
    })
});