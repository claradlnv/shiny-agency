import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function Survey() {
    const {questionNumber} = useParams()
    const questionNumberInt = Number(questionNumber)
    const questionPrevious = questionNumberInt === 1 ? 1 : questionNumberInt-1
    const questionNext = questionNumberInt === 10 ? `/results` : `/survey/${questionNumberInt+1}`
    return (
        <div>
            <h1>Questionnaire 🧮</h1>
            <h2>Question {questionNumber}</h2>
            <Link to={`/survey/${questionPrevious}`}>Précédent</Link>
            <Link to={questionNext}>Suivant</Link>

        </div>
    )
}

export default Survey