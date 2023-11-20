import { useContext } from "react"
import { GameContext } from "../../../providers/GameProvider"
import { GameSteps } from "../../../enums"

const IntroStep = () => {
	const { setGameStep } = useContext(GameContext)
	return (
		<div className="p-6 py-[17px] gap-y-6 grid">
			<div className="text-center pb-[17px] border-b-[3px] border-solid border-[#F4F4F5] mx-[-24px] ">
				<h5>Игра в города на время</h5>
			</div>
			<div className="text-sm">
				<p className="mb-6 ">
					Цель: Назвать как можно больше реальных городов.
				</p>
				<ul className="list-disc pl-6">
					<li>Запрещается повторение городов.</li>
					<li>
						Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого
						бы пропускаем эту букву и игрок должен назвать город на букву
						стоящую перед ъ или ь знаком.
					</li>
					<li>
						Каждому игроку дается 2 минуты на размышления, если спустя это время
						игрок не вводит слово он считается проигравшим
					</li>
				</ul>
			</div>
			<div className="text-center">
				<button
					className="w-32 h-10 bg-violet-600 text-white rounded-[4px] mx-auto font-medium"
					onClick={() => setGameStep(GameSteps.Game)}
				>
					Начать игру
				</button>
			</div>
		</div>
	)
}

export default IntroStep
