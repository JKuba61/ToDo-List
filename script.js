let inputTask
let addBtn
let inputTaskError
let taskList
let errorInfo
let allTasks
let taskToEdit
let popup
let popupError
let popupInput
let acceptBtn
let cancelBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	inputTask = document.querySelector(`.input-task`)
	addBtn = document.querySelector(`.btn-add`)
	inputTaskError = document.querySelector(`.error`)
	taskList = document.querySelector(`.task-list`)
	errorInfo = document.querySelector(`.error-info`)
	popup = document.querySelector(`.popup`)
	popupError = document.querySelector(`.popup-error`)
	popupInput = document.querySelector(`.popup-input`)
	acceptBtn = document.querySelector(`.accept`)
	cancelBtn = document.querySelector(`.cancel`)
}

const prepareDOMEvents = () => {
	addBtn.addEventListener(`click`, addTask)
	taskList.addEventListener(`click`, clickTools)
	cancelBtn.addEventListener(`click`, closePopup)
	acceptBtn.addEventListener(`click`, changeTask)
	inputTask.addEventListener(`keyup`, checkEnter1)
	popupInput.addEventListener(`keyup`, checkEnter2)
}

const addTask = () => {
	if (inputTask.value != ``) {
		const newTask = document.createElement(`li`)
		newTask.classList.add(`task`)
		newTask.innerHTML = `
        <p class="taskInfo">${inputTask.value}</p>
        <div class="tools">
            <button class="complete"><i class="fas fa-check"></i></button>
            <button class="edit"> Edit </button>
            <button class="delete"><i class="fas fa-times"></i></button>
        </div>
        `
		taskList.append(newTask)
		inputTask.value = ``
		inputTaskError.style.visibility = 'hidden'
		errorInfo.style.visibility = 'hidden'
	} else {
		inputTaskError.style.visibility = 'visible'
	}
}

const checkEnter1 = e => {
	if (e.key == `Enter`) {
		addTask()
	}
}

const clickTools = e => {
	if (e.target.matches(`.complete`)) {
		e.target.closest('.task').firstElementChild.classList.toggle(`completed`)
		e.target.classList.toggle(`completed`)
	} else if (e.target.matches(`.edit`)) {
		editTask(e)
	} else if (e.target.matches(`.delete`)) {
		removeTask(e)
	}
}

const removeTask = e => {
	e.target.closest('.task').remove()
	allTasks = document.getElementsByClassName(`task`)
	if (allTasks.length == 0) {
		errorInfo.style.visibility = 'visible'
	}
}

const editTask = e => {
	popup.classList.add(`show`)
	taskToEdit = e.target.closest('li')
	popupInput.value = taskToEdit.firstElementChild.textContent
}

const changeTask = () => {
	if (popupInput.value != ``) {
		taskToEdit.firstElementChild.textContent = popupInput.value
		popup.classList.remove(`show`)
		popupError.style.display = `none`
	} else {
		popupError.style.display = `block`
	}
}

const checkEnter2 = e => {
	if (e.key == 'Enter') {
		changeTask()
	}
}

const closePopup = () => {
	popup.classList.remove(`show`)
	popupError.style.display = `none`
}

document.addEventListener(`DOMContentLoaded`, main)
