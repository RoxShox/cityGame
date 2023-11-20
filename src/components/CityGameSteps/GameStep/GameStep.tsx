import {
	useState,
	useContext,
	useCallback,
	ChangeEvent,
	useMemo,
	FormEvent,
} from "react"
import Timer from "./Timer"
import { GameContext } from "../../../providers/GameProvider"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
import { ReactComponent as SVGIcon } from "../../../assets/img/Icon.svg"
import { GameSteps } from "../../../enums"

const GameStep = () => {
	const {
		allCities,
		gameTurn,
		setGameStep,
		isCurrentMoveByComputer,
		lastChar,
		submitAnswer,
	} = useContext(GameContext)

	const [inputCityValue, setInputCityValue] = useState("")
	const [errorValidate, setErrorValidate] = useState(false)

	const handleInputCityChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setInputCityValue(event.target.value)

			if (errorValidate) {
				setErrorValidate(false)
			}
		},
		[errorValidate]
	)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		submitAnswer(
			inputCityValue,
			() => setErrorValidate(true),
			() => setInputCityValue("")
		)
	}

	const inputPlaceholder = useMemo(() => {
		if (isCurrentMoveByComputer) {
			return "Ожидаем ответа соперника..."
		}

		return allCities.length > 0
			? `Знаете город на букву “${lastChar.toUpperCase()}”?`
			: "Напишите любой город, например: Где вы живете?"
	}, [isCurrentMoveByComputer, allCities, lastChar])

	const inputDisabled = clsx({
		"text-gray-700": !isCurrentMoveByComputer,
		"text-gray-400": isCurrentMoveByComputer,
	})
	const buttonDisabled = clsx({
		"bg-violet-500": !isCurrentMoveByComputer,
		"bg-gray-400": isCurrentMoveByComputer,
	})

	return (
		<div className="p-4">
			<Timer
				timerText={
					isCurrentMoveByComputer
						? "Сейчас очередь соперника"
						: "Сейчас ваша очередь"
				}
				onTimeEnd={() => setGameStep(GameSteps.Results)}
				timerKey={gameTurn}
			/>
			<div className="h-[320px] overflow-auto pt-5">
				{allCities.map((citie, i) => (
					<div
						key={citie}
						className={twMerge(
							"flex",
							i % 2 !== 0 ? "justify-start" : "justify-end"
						)}
					>
						<div
							className={twMerge(
								" text-white rounded-xl py-[8px] px-3 mb-2",
								i % 2 !== 0
									? "bg-violet-50 text-gray-700 rounded-bl-none px-4"
									: "bg-violet-500 rounded-br-none"
							)}
						>
							{citie}
						</div>
					</div>
				))}
			</div>
			<p className="text-center text-[14px] text-gray-400 py-[16px]">
				Всего перечислено городов: {allCities.length}
			</p>
			<form onSubmit={handleSubmit}>
				<div className="relative">
					<input
						value={inputCityValue}
						onChange={handleInputCityChange}
						type="text"
						disabled={isCurrentMoveByComputer}
						placeholder={inputPlaceholder}
						className={twMerge(
							"bg-gray-100 w-full h-[55px] rounded-md outline-0 pl-3 pr-10 max-sm:h-9",
							`placeholder:${inputDisabled} max-sm:text-[12px] max-[420px]:text-[10px]`
						)}
					/>

					<button
						disabled={isCurrentMoveByComputer}
						type="submit"
						className={twMerge(
							"bg-violet-500 w-8 h-8 absolute rounded-md right-2 top-[50%] translate-y-[-50%] text-white flex justify-center items-center max-sm:h-6 max-sm:w-7",
							buttonDisabled
						)}
					>
						<SVGIcon />
					</button>
				</div>
				{errorValidate && (
					<p className="text-center text-red-600 pt-3">
						Введите корректный город
					</p>
				)}
			</form>
		</div>
	)
}

export default GameStep
