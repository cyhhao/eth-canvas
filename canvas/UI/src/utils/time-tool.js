class TimeTool {
	static format_date(t, format = "-") {
		let time = new Date(t)
		let y = time.getFullYear()
		let m = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1)
		let d = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate())
		let date_s
		if (format === 'zh')
			date_s = y + '年' + m + '月' + d + "日"
		else
			date_s = y + '-' + m + '-' + d

		return date_s
	}

	static format_time(t) {
		let time = new Date(t)
		let h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours())
		let mm = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes())
		let s = (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds())
		let time_s = h + ':' + mm + ':' + s
		return time_s

	}

	static format_datetime(t) {
		return TimeTool.format_date(t) + " " + TimeTool.format_time(t)
	}

	static getNowTimestamp() {
		return new Date().getTime()
	}
}

export default TimeTool