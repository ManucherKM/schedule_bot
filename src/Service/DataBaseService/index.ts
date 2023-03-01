// Модули
import { Schema, model } from 'mongoose'
import UserModel from './Models/UserModel'
import BotModel from './Models/BotModel'

//Типы
import { IBot, IUser } from '../../Types/types'

// Экспорт
export { IUser, UserModel, Schema, model, IBot, BotModel }
