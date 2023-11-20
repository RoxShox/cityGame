import {
	Dispatch,
	SetStateAction,
	createContext,
	useState,
	ReactNode,
	useCallback,
	useMemo,
	useEffect,
} from "react"
import { GameSteps, GameTurn } from "../enums"
import { getValidLastChar } from "../utils/getValidLastChar"
import { checkExistsCity } from "../utils/checkExistsCity"
import { data } from "../mocks/data"
import { getRandomRangeTime } from "../utils/geterateAnswerComputer"
import { DEFAULT_ANSWER_TIME_MS } from "../constants"

const checkValidFirstLetter = (lastChar: string, newWord: string) => {
	return lastChar.toLowerCase() === newWord[0].toLowerCase()
}

const getLastChar = (word?: string) => {
	return word ? getValidLastChar(word) : ""
}

type SubmitAnswer = (
	cityValue: string,
	onError?: () => void,
	onSuccess?: () => void
) => void

type GameProvidersProps = {
	children: ReactNode
}

type ResultData = {
	rightAnswer: string
	person: GameTurn
}

type IContext = {
	allCities: string[]
	gameStep: GameSteps
	gameTurn: GameTurn
	setGameStep: Dispatch<SetStateAction<GameSteps>>
	resetGame: () => void
	lastChar: string
	isCurrentMoveByComputer: boolean
	submitAnswer: SubmitAnswer
	resultData: ResultData | null
}

export const GameContext = createContext<IContext>({} as IContext)

export const GameProvider = ({ children }: GameProvidersProps) => {
	const [allCities, setAllCities] = useState<string[]>([])
	const [gameStep, setGameStep] = useState<GameSteps>(GameSteps.Intro)
	const [gameTurn, setGameTurn] = useState<GameTurn>(GameTurn.Human)
	const [lastChar, setLastChar] = useState<string>("")
	const [resultData, setResultData] = useState<ResultData | null>(null)

	const isCurrentMoveByComputer = useMemo(
		() => gameTurn === GameTurn.Computer,
		[gameTurn]
	)

	//Инициализация ответа от компьютера
	const initComputerAnswer = (lastChar: string) => {
		setGameTurn(GameTurn.Computer)

		const computerAnswer = () => {
			return data.find(function (cityName) {
				if (
					!allCities.includes(cityName) &&
					checkValidFirstLetter(lastChar, cityName)
				) {
					return cityName
				}
			})
		}

		const answerTime = getRandomRangeTime(1000, 125000)

		if (answerTime >= DEFAULT_ANSWER_TIME_MS) {
			return
		}

		const cityValue = computerAnswer()

		if (cityValue) {
			//Имитируем задержку ответа от комьютера с помощью случайного числа времени setTimeout
			const computerTimeout = setTimeout(() => {
				setAllCities((prev) => {
					const newCities = [...prev, cityValue]
					const lastChar = getLastChar(newCities[newCities.length - 1])
					setLastChar(lastChar)

					return newCities
				})
				setResultData({ rightAnswer: cityValue, person: GameTurn.Computer })
				setGameTurn(GameTurn.Human)
				clearTimeout(computerTimeout)
			}, answerTime)
		}
	}

	//Инициализация ответа от человека
	const initHumanAnswer = (cityValue: string) => {
		setGameTurn(GameTurn.Human)

		const isValidCity =
			!allCities.includes(cityValue) &&
			checkValidFirstLetter(lastChar, cityValue)

		if (allCities.length === 0 || isValidCity) {
			setAllCities((prev) => {
				const newCities = [...prev, cityValue]
				const lastChar = getLastChar(newCities[newCities.length - 1])
				setLastChar(lastChar)
				setResultData({ rightAnswer: cityValue, person: GameTurn.Human })
				initComputerAnswer(lastChar)

				return newCities
			})

			return true
		}

		return null
	}

	const submitAnswer: SubmitAnswer = (cityValue, onError, onSuccess) => {
		if (!checkExistsCity(cityValue)) {
			return onError?.()
		}

		if (initHumanAnswer(cityValue)) {
			return onSuccess?.()
		}

		return onError?.()
	}

	const resetGame = useCallback(() => {
		setGameStep(GameSteps.Intro)
		setAllCities([])
	}, [])

	return (
		<GameContext.Provider
			value={{
				allCities,
				gameStep,
				gameTurn,
				setGameStep,
				resetGame,
				lastChar,
				submitAnswer,
				resultData,
				isCurrentMoveByComputer,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
