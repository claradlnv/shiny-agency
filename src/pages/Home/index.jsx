import { styled } from 'styled-components'
import colors from '../../utils/style/colors'
import illustration from '../../assets/home-illustration.svg'
import { Link } from 'react-router-dom'
import { useTheme } from '../../utils/hooks'

const Background = styled.div`
    position: absolute;
    width: 1313px;
    height: 824px;
    left: 65px;
    top: 200px;
    background: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`
const Illustration = styled.img`
    position: absolute;
    width: 541px;
    height: 506px;
    left: 760px;
    top: 139px;
`

const TexteHome = styled.span`
    position: absolute;
    width: 552px;
    height: 249px;
    left: 98px;
    top: 176px;

    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 160.5%;

    color: ${({ theme }) =>
    theme === 'light' ? `#2f2e41` : `white`};
`

const BoutonHome = styled(Link)`
    position: absolute;
    width: 261px;
    height: 25px;
    left: 91px;
    top: 556px;
    padding: 15px;
    text-decoration: none;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    text-align: center;
    padding-block-start: 10px;
    ${(props) =>
        props.$isFullLink &&
        `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`
function App() {
    const {theme} = useTheme()
    
    return (
        <Background theme={theme}>
            <TexteHome theme={theme}>
                Repérez vos besoins, on s’occupe du reste, avec les meilleurs
                talents
            </TexteHome>
            <BoutonHome to="/survey/1" $isFullLink>
                Faire le test
            </BoutonHome>
            <Illustration src={illustration} alt="Illustration" />
        </Background>
    )
}

export default App
