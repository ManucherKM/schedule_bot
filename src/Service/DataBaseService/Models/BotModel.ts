import { Schema, model, IBot } from '../index'

const Bot = new Schema<IBot>(
	{
		name: { type: String, required: true, unique: true },
		quantity: { type: Number, default: 0 },
		users: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	},
)

export default model('Bot', Bot)
