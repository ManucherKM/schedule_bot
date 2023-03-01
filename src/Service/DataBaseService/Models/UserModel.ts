import { IUser, Schema, model } from '../index'

const User = new Schema<IUser>(
	{
		name: { type: String },
		tg_id: { type: String },
		chat_id: { type: Number, unique: true },
	},
	{
		timestamps: true,
	}
)

export default model('User', User)
