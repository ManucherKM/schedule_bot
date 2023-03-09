enum Commands {
	getTeacherSchedule = 'Расписание учителя',
	getBellSchedule = 'Расписание звонков',
	getFreeCabinets = 'Свободные кабинеты',
	getCoupleSchedule = 'Расписание пар',
	getStatistics = 'Статистика',
	sendNewsletter = 'Рассылка',
	getProfile = 'Профиль',
	getRatings = 'Оценки',
	change = 'Изменить',
	getHelp = 'Помощь',
	start = '/start',
	back = 'Назад',
}

enum Roles {
	admin = 'Админ',
	teacher = 'Учитель',
	student = 'Студент',
}

enum Subdivision {
	SP1 = 'СП-1',
	SP2 = 'СП-2',
	SP3 = 'СП-3',
	SP4 = 'СП-4',
}

enum UrlsSubdivision {
	SP1 = 'https://www.surpk.ru/schedule/view?id=1',
	SP2 = 'https://www.surpk.ru/schedule/view?id=3',
	SP3 = 'https://www.surpk.ru/schedule/view?id=4',
	SP4 = 'https://www.surpk.ru/schedule/view?id=5',
}

enum Сourses {
	first = '1 курс',
	second = '2 курс',
	third = '3 курс',
	fourth = '4 курс',
}

enum Stickers {
	сute = 'https://tlgrm.eu/_/stickers/4ae/824/4ae824f9-d302-42d9-aebc-34327868b0e9/192/1.webp',
	panic = 'https://tlgrm.eu/_/stickers/4ae/824/4ae824f9-d302-42d9-aebc-34327868b0e9/192/5.webp',
}

enum InitialBot {
	nameBot = 'Schedule_bot',
}

export {
	Commands,
	Сourses,
	Stickers,
	InitialBot,
	Roles,
	Subdivision,
	UrlsSubdivision,
}
