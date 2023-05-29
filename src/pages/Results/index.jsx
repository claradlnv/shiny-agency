import styled from 'styled-components'
import { useContext } from 'react'
import { SurveyContext, ThemeContext } from '../../utils/context'
import { Loader } from '../../utils/Atoms'
import colors from '../../utils/style/colors'
import { useFetch } from '../../utils/hooks'
import { useTheme } from '../../utils/hooks'
import EmptyList from '../../components/EmptyList'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const Background = styled.div`
    position: absolute;
    width: 1313px;
    height: 824px;
    left: 65px;
    top: 200px;
    background: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
`

const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === 'light' ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export function formatFetchParams(answers) {
  const answerNumbers = Object.keys(answers)

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParam = index === 0
    const separator = isFirstParam ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

export function formatJobList(title, listLength, index) {
  if (index === listLength - 1) {
      return title
  }
  return `${title},`
}

function Results() {
    const {theme} = useTheme()
    const {answers} = useContext(SurveyContext)
    const formatAnswers = formatFetchParams(answers)

    const { data, isLoading, error } = useFetch(`http://localhost:8000/results/?${formatAnswers}`)
    const {resultsData} = data

    if (error){
      return <span>Il y a un problème</span>
    }

    if (resultsData?.length < 1){
      return <EmptyList theme={theme}/>
    }
    return isLoading ? (
            <LoaderWrapper>
                <Loader data-testid='loader'/>
            </LoaderWrapper>
        ) : (
        <ResultsContainer theme={theme}>
            <ResultsTitle theme={theme}>
                Les compétences dont vous avez besoin : {
                    resultsData && resultsData.map((result, index) => 
                        <JobTitle key={index} theme={theme}>
                            {index === resultsData.length-1 ? result.title : `${result.title},`}
                        </JobTitle>
                    )
                }
            </ResultsTitle>
            <div>
                {resultsData && resultsData.map((result, index) => 
                    <DescriptionWrapper key={index}>
                        <JobTitle theme={theme}> {formatJobList(result.title, resultsData.length, index)}</JobTitle>
                        <JobDescription theme={theme}>{result.description}</JobDescription>
                    </DescriptionWrapper>
                )}
            </div>
        </ResultsContainer>
    )
}

export default Results
