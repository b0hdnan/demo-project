console.clear()

//змінні
let tasks = []
let times = []
let dates = []
let deadLineTimeDetails = {} // заготовка для утворення кінцевої дати
let currentTimeDetails = new Date() // поточна дата
let diff = 0 // різниця між датами

let iconNumberClicked = 0

let addTaskButton = document.querySelector("button")
let input = document.querySelector(".task")
let inputTime = document.querySelector(".time")
let inputDate = document.querySelector(".date")
let taskList = document.querySelector(".task-list")

//відновлення списку
let prevTasks = localStorage.getItem("mytasks")
let prevTimes = localStorage.getItem("mytimes")
let prevDates = localStorage.getItem("mydates")

if (prevTasks) {
	tasks = prevTasks.split(",")
	times = prevTimes.split(",")
	dates = prevDates.split(",")
	tasks.forEach((item, index) => {
		let taskRow = document.createElement("div")
		taskRow.setAttribute("class", "task-row")
		let elementTask = document.createElement("div")
		let deadline = document.createElement("div")
				//налаштовую вигляд іконки
		let editIcon = document.createElement("i")
		editIcon.classList = "far fa-edit"
		editIcon.setAttribute("data-number", index)
		editIcon.addEventListener("click", showModal)

		taskList.appendChild(taskRow)
		// утворюємо кінцеву дату
		let data_y_m_d = dates[index].split("-").map(Number)
		let data_h_m = times[index].split(":").map(Number)
		// виправляємо місяць, слід зменшити після зчитування на 1
		data_y_m_d[1] = data_y_m_d[1] - 1
		// утворюємо кінцеву дату
		deadLineTimeDetails = new Date(...[...data_y_m_d, ...data_h_m])
		// дізнаємося різницю в мілісекундах
		diff = deadLineTimeDetails - currentTimeDetails
		elementTask.textContent = tasks[index]
		if (diff < 0) {
			deadline.textContent = "Часу не залишилось"
		}
		else {
			// записуємо текст у вузли
			deadline.textContent = `Залишось ${distanceDates(diff)[2]} дн. ${distanceDates(diff)[1]} год. ${distanceDates(diff)[0]} хв.`
		}
		// виводимо вузлів на екран
		taskRow.appendChild(elementTask)
		taskRow.appendChild(deadline)
		taskRow.appendChild(editIcon)
	})
}


function distanceDates(d, minutesLeft, hoursLeft, daysLeft) {
	// вираховуємо
	minutesLeft = Math.trunc(d / (1000 * 60)) % 60
	hoursLeft = Math.trunc(d / (1000 * 60 * 60)) % 24
	daysLeft = Math.trunc(d / (1000 * 60 * 60 * 24))
	return [minutesLeft, hoursLeft, daysLeft]
}

//натиснення на +
addTaskButton.addEventListener("click", () => {
	if (input.value && inputTime.value && inputDate.value) {
		let taskRow = document.createElement("div")
		taskRow.setAttribute("class", "task-row")

		let elementTask = document.createElement("div")
		let deadline = document.createElement("div")
		//налаштовую вигляд іконки
		let editIcon = document.createElement("i")
		editIcon.classList = "far fa-edit"
		editIcon.setAttribute("data-number", tasks.length)
		editIcon.addEventListener("click", showModal)
		// записуємо текст у вузли
		elementTask.textContent = input.value
		// утворюємо кінцеву дату
		let data_y_m_d = inputDate.value.split("-").map(Number)
		let data_h_m = inputTime.value.split(":").map(Number)
		// виправляємо місяць, слід зменшити після зчитування на 1
		data_y_m_d[1] = data_y_m_d[1] - 1
		// утворюємо кінцеву дату
		deadLineTimeDetails = new Date(...[...data_y_m_d, ...data_h_m])
		// дізнаємося різницю в мілісекундах
		diff = deadLineTimeDetails - currentTimeDetails
		if (diff < 0) {
			deadline.textContent = "Часу не залишилось"
		}
		else {
			deadline.textContent = `Залишось ${distanceDates(diff)[2]} дн. ${distanceDates(diff)[1]} год. ${distanceDates(diff)[0]} хв.`

			taskList.appendChild(taskRow)

			// виводимо вузлів на екран
			taskRow.appendChild(elementTask)
			taskRow.appendChild(deadline)
			taskRow.appendChild(editIcon)

			// записуємо в базу local storage
			tasks.push(input.value)
			times.push(inputTime.value)
			dates.push(inputDate.value)

			localStorage.setItem("mytasks", tasks)
			localStorage.setItem("mytimes", times)
			localStorage.setItem("mydates", dates)
		}
	}
})
let modal = document.querySelector(".modal")

// let modalTask =
function showModal(n, taskModal, timeModal, dateModal){
	modal.style.display = "flex"
	n = this.dataset.number
	taskModal = document.querySelector(".task-modal")
	timeModal = document.querySelector(".time-modal")
	dateModal = document.querySelector(".date-modal")
	taskModal.value = tasks[n]
	timeModal.value = times[n]
	dateModal.value = dates[n]
	iconNumberClicked = n
}

let changeBtn = document.querySelector(".change-btn")

changeBtn.addEventListener("click", changeTask)

function changeTask(taskModal, timeModal, dateModal){
	taskModal = document.querySelector(".task-modal")
	timeModal = document.querySelector(".time-modal")
	dateModal = document.querySelector(".date-modal")
	taskRows = document.querySelectorAll(".task-row")
	console.log(taskRows[iconNumberClicked])
}








