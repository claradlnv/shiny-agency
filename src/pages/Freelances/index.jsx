import Card from '../../components/Card'
import styled from 'styled-components'

const freelanceProfiles = [
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
]

const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
`


function Freelances() {
    return (
      <div>
        <h1>Freelances</h1>
        <CardsContainer>
            {freelanceProfiles.map((profile, index) => (
                <Card
                        key={`${profile.name}-${index}`}
                        label={profile.jobTitle}
                        picture={profile.picture}
                        title={profile.name}
                />
            ))}
        </CardsContainer>
        
        </div>
    )
  }
  
  export default Freelances