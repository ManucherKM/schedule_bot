import { Schema, model, IBot } from '../index'

const Bot = new Schema<IBot>(
	{
		name: { type: String, unique: true },
		quantity: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
)

export default model('Bot', Bot)
