import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { DEFAULT_ANSWER_TIME_SEC } from "../../../constants"

const getRemainingTimePercent = (
	currentTime: number,
	fullTime = DEFAULT_ANSWER_TIME_SEC
) => {
	return Math.floor((currentTime / fullTime) * 100)
}

const getPrettyTimeBySeconds = (seconds: number) => {
	const prettyMinutes = String(Math.floor(seconds / 60)).padStart(2, "0")
	const prettySeconds = String(seconds % 60).padStart(2, "0")

	return `${prettyMinutes}:${prettySeconds}`
}

type TimerProps = {
	timerText: string
	onTimeEnd: () => void
	timerKey?: unknown
}

const Timer = ({ onTimeEnd, timerKey, timerText }: TimerProps) => {
	const [seconds, setSeconds] = useState(DEFAULT_ANSWER_TIME_SEC)

	const interval = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		interval.current = setInterval(() => {
			setSeconds((prev) => Math.max(prev - 1, 0))
		}, 1000)

		return () => {
			if (interval.current) {
				setSeconds(DEFAULT_ANSWER_TIME_SEC)
				clearInterval(interval.current)
			}
		}
	}, [timerKey])

	useEffect(() => {
		if (seconds === 0 && interval.current) {
			clearInterval(interval.current)
			onTimeEnd()
		}
	}, [seconds, interval.current])

	const isDanger = seconds < 10

	return (
		<>
			<div className="flex items-center justify-between mb-3">
				<p>{timerText}</p>
				<div>
					<span className={twMerge(isDanger && "text-red-600")}>
						{getPrettyTimeBySeconds(seconds)}
					</span>
				</div>
			</div>
			<div className="relative mx-[-16px]">
				<span className="h-[5px] bg-gray-100 block "></span>
				<span
					className="h-[5px] bg-violet-300 block absolute top-0"
					style={{ width: `${getRemainingTimePercent(seconds)}%` }}
				></span>
			</div>
		</>
	)
}

export default Timer
