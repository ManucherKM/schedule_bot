import { Schema, model } from 'mongoose'
import { IStudent } from '../../../Types/types'

interface IStudentDataBase extends IStudent {
	date: Date
}

const StudentSchema = new Schema<IStudentDataBase>(
	{
		chatId: { type: Number, required: true, unique: true },
		group: { type: String, required: true },
		date: { type: Date, default: new Date() },
		tgId: { type: String },
		keySchedule: { type: String },
		role: { type: String, required: true },
		subdivision: { type: String, required: true },
		activity: {},
	},
	{ timestamps: true },
)

export default model<IStudentDataBase>('Student', StudentSchema)
