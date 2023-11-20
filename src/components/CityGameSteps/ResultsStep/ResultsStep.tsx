import { useContext } from "react"
import { GameContext } from "../../../providers/GameProvider"
import { twMerge } from "tailwind-merge"
import { GameTurn } from "../../../enums"

const ResultsStep = () => {
	const { allCities, resetGame, resultData } = useContext(GameContext)

	if (!resultData) {
		return <h1>Не введено ни одного города</h1>
	}

	const isComputerWinner = resultData.person === GameTurn.Computer

	return (
		<div className="text-center grid gap-y-8 py-10">
			<div className="text-xl">
				<p>
					{isComputerWinner
						? "Твой противник победил!"
						: "Твой противник не вспомнил нужный город!"}
				</p>
				<p>
					{isComputerWinner
						? "К сожалению твое время вышло!"
						: "Поздравляем тебя с победой!"}
				</p>
			</div>

			<div>
				<span
					className={twMerge(
						" text-green-600 text-[30px] font-medium",
						isComputerWinner && "text-red-600"
					)}
				>
					00:00
				</span>
			</div>
			<div className="text-xl">
				<p> Всего было перечислено городов:{allCities.length}</p>
				<p>Очень не плохой результат!</p>
			</div>
			<div>
				<p className="text-xl">Последний город названный победителем</p>
				<h5 className="text-2xl font-medium">{resultData.rightAnswer}</h5>
			</div>
			<button
				onClick={resetGame}
				className="text-white bg-violet-600 rounded max-w-[180px] w-[180px] font-medium h-10 mx-auto"
			>
				Начать новую игру
			</button>
		</div>
	)
}

export default ResultsStep
