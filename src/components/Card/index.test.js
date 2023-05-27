import Card from "./";
import {screen, render, fireEvent} from "@testing-library/react"
import { ThemeProvider } from "../../utils/context";


describe('Card', () => {
    test('Picture', async () => {
        render(
            <ThemeProvider>
                <Card label='job' picture='picture' title='name' />
            </ThemeProvider>
        )
        const cardImage = screen.getByRole('img')
        expect(cardImage.src).toContain('picture')

        const cardTitle = screen.getByTestId('card-title')
        expect(cardTitle.textContent).toEqual('name')

        // eslint-disable-next-line testing-library/no-node-access
        const wrapper = cardTitle.closest('div')
        fireEvent.click(wrapper)
        expect(cardTitle.textContent).toEqual('⭐️name⭐️')

    })
})