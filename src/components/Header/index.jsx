import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import colors from '../../utils/style/colors'
import logo from '../../assets/dark-logo.png'
 
const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    ${(props) =>
        props.$isFullLink && `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`

const Navigation = styled.nav`
    position: absolute;
    top: 42px;
    right: 62px;
`

const Logo = styled.img`
    position: relative;
    width: 187.63px;
    height: 70px;
    left: 33px;
    top: 30px;
`

function Header() {
    return (
        <div>
            <Link to="/">
                <Logo src={logo} alt="Shiny logo" />
            </Link>
            <Navigation>
                <StyledLink to="/">Accueil</StyledLink>
                <StyledLink to="/survey/1" $isFullLink>Faire le test</StyledLink>
                <StyledLink to="/freelances">Profils</StyledLink>
            </Navigation>
        </div>
    )
}

export default Header