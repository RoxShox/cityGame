import { useContext } from "react"
import { GameContext } from "../../providers/GameProvider"
import IntroStep from "./IntroStep/IntroStep"
import GameStep from "./GameStep/GameStep"
import ResultsStep from "./ResultsStep/ResultsStep"
import { GameSteps } from "../../enums"

const CityGameSteps = () => {
	const { gameStep } = useContext(GameContext)
	return (
		<div>
			{gameStep === GameSteps.Intro && <IntroStep />}
			{gameStep === GameSteps.Game && <GameStep />}
			{gameStep === GameSteps.Results && <ResultsStep />}
		</div>
	)
}

export default CityGameSteps
