import { IUser, Schema, model } from '../index'

const User = new Schema<IUser>(
	{
		name: { type: String, required: true },
		tg_id: { type: String, required: true },
		chat_id: { type: Number, required: true, unique: true },
		quantity: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	},
)

export default model('User', User)
