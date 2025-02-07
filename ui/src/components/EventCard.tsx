import { cn } from "@/utils"
import { motion } from "motion/react"

export const EventCard = ({
	message,
	isKnockout
}: {
	message: any
	isKnockout: boolean
}) => {
	return (
		<motion.li
			exit={{ opacity: 1 }}
			transition={{ ease: "easeOut", duration: 0.8 }}
			className={cn(
				"p-2 bg-white border",
				isKnockout && "bg-red-200 border-red-600"
			)}
			layout>
			<div>
				<div>{message.body.date}</div>
				<div className={cn(isKnockout && "font-bold")}>
					{JSON.parse(message.body.data).message}
				</div>
			</div>
		</motion.li>
	)
}
