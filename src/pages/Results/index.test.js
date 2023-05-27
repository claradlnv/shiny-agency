import { formatJobList, formatFetchParams } from "./";
import { rest } from "msw";
import {setupServer} from 'msw/node'
import { render } from "../../utils/test";

import Results from './'
import { waitForElementToBeRemoved, screen } from "@testing-library/react";


describe('The formatJobList function', () => {
    it('should add a coma to a word', () => {
        const expectedState = 'item2,'
        expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
    })
    it('should not add a coma to the last element of the list', () => {
        const expectedState = 'item3'
        expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
    })
})

describe('The formatFetchParams function', () => {
    it('should not add an & to the first element', () => {
        const expectedState = 'a1=answer1'
        expect(formatFetchParams({1: 'answer1'})).toEqual(expectedState)
    })
    it('should  add an & to the second element', () => {
        const expectedState = 'a0=1&a1=0'
        expect(formatFetchParams([1,0])).toEqual(expectedState)
    })
})

const resultsMockedData = [
    {
        title: 'Mage noir',
        description: 'horrible'
    },
    {
        title: 'Etudiant',
        description: 'à Poudlard'
    }
]

const server = setupServer(
    //on précise l'url qu'il faudra "intercepter"
    rest.get('http://localhost:8000/results', (req, res, ctx) => {
        //là on passe les datats mockées dans ce qui est retourné en json
        return res(ctx.json({resultsData: resultsMockedData}))
    })
)

//active la simulation d'API avant les tests depuis le server
beforeAll(() => server.listen())
//réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
beforeEach(() => server.resetHandlers())
//ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

it('Should display results after loader is removed', async () => {
    render(<Results/>)

    // eslint-disable-next-line testing-library/prefer-query-by-disappearance
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(screen.getByText('Mage noir,')).toBeInTheDocument()
    expect(screen.getByText('Etudiant')).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
})