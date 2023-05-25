import { styled } from 'styled-components'
import colors from '../../utils/style/colors'
import error from '../../assets/404.svg'

const Background = styled.div`
    position: absolute;
    width: 1313px;
    height: 1256px;
    left: 63px;
    top: 189px;
    background: ${colors.backgroundLight};
`
const ImageError = styled.img`
    position: absolute;
    width: 875px;
    height: 476px;
    left: 219px;
    top: 201px;
`
const TexteError = styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 31px;
    line-height: 36px;
    text-align: center;
    position: relative;
    color: #2f2e41;
    left: 425px;
    top: 99px;
`
function Error() {
    return (
        <Background>
            <TexteError>Oups...</TexteError>
            <ImageError src={error} alt="Erreur" />
            <TexteError>Il semblerait qu’il y ait un problème</TexteError>
        </Background>
    )
}

export default Error
