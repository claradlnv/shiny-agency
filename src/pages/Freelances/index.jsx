import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/Atoms'
import { useFetch } from '../../utils/hooks'

/* const freelanceProfiles = [
    {
        name: 'Jane Doe',
        jobTitle: 'Devops',
    },
    {
        name: 'John Doe',
        jobTitle: 'Developpeur frontend',
    },
    {
        name: 'Jeanne Biche',
        jobTitle: 'Développeuse Fullstack',
    },
] */

const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
`

const PageTitle = styled.h1`
    font-size: 30px;
    color: black;
    text-align: center;
    padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
    font-size: 20px;
    color: ${colors.secondary};
    font-weight: 300;
    text-align: center;
    padding-bottom: 30px;
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

function Freelances() {
    const { data, isLoading, error } = useFetch(`http://localhost:8000/freelances`)
    const { freelancersList } = data

/*     useEffect(() => {
        setDataLoading(true)
        fetch(`http://localhost:8000/freelances`)
            .then((response) => response.json())
            .then(({ freelancersList }) => {
                setFreelancesProfiles(freelancersList)
                setDataLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setError(true)
            })
    }, []) */

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    return (
        <div>
            <PageTitle>Trouvez votre prestataire</PageTitle>
            <PageSubtitle>
                Chez Shiny nous réunissons les meilleurs profils pour vous.
            </PageSubtitle>
            {isLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <CardsContainer>
                    {freelancersList && freelancersList.map((profile, index) =>
                        <Card
                            key={`${profile.name}-${index}`}
                            label={profile.job}
                            picture={profile.picture}
                            title={profile.name}
                        />
                        )
                    }
                </CardsContainer>
            )}
        </div>
    )
}

export default Freelances
