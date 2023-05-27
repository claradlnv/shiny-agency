import { rest } from "msw";
import {setupServer} from 'msw/node'
import { waitFor, screen } from "@testing-library/react";
import {render} from '../../utils/test/index'

import Freelances from "./";
import { ThemeProvider } from "../../utils/context";

const freelancersMockedData = [
    {
        name: 'Harry Potter',
        job: 'Magicien frontend',
        picture: '',
    },
    {
        name: 'Hermione Granger',
        job: 'Magicienne fullstack',
        picture: '',
    },
]

const server = setupServer(
    //on précise l'url qu'il faudra "intercepter"
    rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
        //là on passe les datats mockées dans ce qui est retourné en json
        return res(ctx.json({freelancersList: freelancersMockedData}))
    })
)

//active la simulation d'API avant les tests depuis le server
beforeAll(() => server.listen())
//réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
beforeEach(() => server.resetHandlers())
//ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

it('Should render without crash', async () => {
    render(<Freelances />)
    expect(screen.getByTestId('loader')).toBeTruthy()
    await waitFor(() => {
        expect(screen.getByText('Harry Potter')).toBeTruthy()
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('Hermione Granger')).toBeTruthy()
    })
})