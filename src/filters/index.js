import dayjs from 'dayjs'

export const formatTime = (value, formate = 'YYYY-MM-DD') => dayjs(value).format(formate)
