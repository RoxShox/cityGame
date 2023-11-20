import { GameProvider } from "../../providers/GameProvider"
import CityGameSteps from "../CityGameSteps/CityGameSteps"

const CityGame = () => {
	return (
		<GameProvider>
			<CityGameSteps />
		</GameProvider>
	)
}

export default CityGame
