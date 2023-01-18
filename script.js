function resLi(obj) {
	const templateElement = document.getElementById("template");
	if(!templateElement) return null;
	const liElement = templateElement.content.firstElementChild.cloneNode(true);
	if(!liElement) return null;
	const h1Element = liElement.querySelector("h1");
	if(!h1Element) return null;
	h1Element.textContent = obj.name;
	liElement.id = obj.id;
 	// Add event button
 	const finishButton = liElement.querySelector(".finish");
 	if(!finishButton) return null;
 	const removeButton = liElement.querySelector(".remove");
 	if(!removeButton) return null;
 	const editButton = liElement.querySelector(".edit");
 	 liElement.dataset.status = obj.status;
 	const finishColor = obj.status == "pending" ? "green2" : "green1";
 	const liColor = obj.status == "pending" ? "gray2" : "gray1";
 	const finishText = obj.status == "pending" ? "Finish" : "Reset";
 	liElement.classList.add(liColor);
 	finishButton.classList.add(finishColor);
 	finishButton.textContent = finishText;	
  	finishButton.addEventListener("click", () => {
 		const checkColor = liElement.dataset.status == "pending" ? "green1" : "green2";
 		const checkLiColor = liElement.dataset.status == "pending" ? "gray1" : "gray2";
 		const checkText = liElement.dataset.status == "pending" ? "Reset" : "Finish";	
 		liElement.dataset.status = liElement.dataset.status == "pending" ? "completed" : "pending";
 		liElement.classList.remove("gray1", "gray2");
 		liElement.classList.add(checkLiColor);
 		finishButton.classList.remove("green1", "green2");
 		finishButton.classList.add(checkColor);
 		finishButton.textContent = checkText;
 		const testCheck = JSON.parse(localStorage.getItem("data"));
 		const posDelete = testCheck.findIndex(e => e.id == liElement.id);
 		testCheck[posDelete].status = liElement.dataset.status;
 		localStorage.setItem("data",JSON.stringify(testCheck));
 	});
 	removeButton.addEventListener("click", () => {
 		liElement.remove();
 		const testCheck = JSON.parse(localStorage.getItem("data"));
 		const posDelete = testCheck.findIndex(e => e.id == liElement.id);
 		testCheck.splice(posDelete,1);
 		localStorage.setItem("data",JSON.stringify(testCheck));
 	});
 	editButton.addEventListener("click", () => {
 		let formElement = document.querySelector("#form");
 		let formValue = formElement.querySelector("#form-value");
 		formValue.value = h1Element.textContent;
 		formElement.dataset.id = liElement.id;
 	});
	return liElement;
}
function renderList(list) {
	const ulElement = document.querySelector(".list");
	if(!ulElement) return null;
	ulElement.textContent = "";
	for(let i of list) {
		const liElement = resLi(i);
		ulElement.appendChild(liElement);
	}
}
function getStorage() {
	return JSON.parse(localStorage.getItem("data"));
}
// localStorage - Storage API
(() => {
	/*
	const list = [
		{id: 1, name: "Learn JS", status: "pending"},
		{id: 2, name: "Learn Nodejs", status: "completed"},
		{id: 3, name: "Learn GIT", status: "pending"},
	];
	*/
	let list = getStorage();
	renderList(list);
	let formElement = document.getElementById("form");
	formElement.addEventListener("submit", (event) => {
		event.preventDefault();
		let check = !formElement.dataset.id ? true : false;
		let formValue = formElement.querySelector("#form-value");
		if(check) {
			let obj = {
				id: Date.now(),
				name: formValue.value,
				status: "pending"
			}
			if(!localStorage.getItem("data")) {
				localStorage.setItem("data", JSON.stringify([obj]));
			}else {
				let arrTamp = JSON.parse(localStorage.getItem("data"));
				arrTamp.push(obj);
				localStorage.setItem("data", JSON.stringify(arrTamp));
			}
			list = getStorage();
			renderList(list);
		}else {
			let arrTamp = JSON.parse(localStorage.getItem("data"));
			arrTamp = arrTamp.map(e => {
				if(e.id == formElement.dataset.id) {
					e.name = formValue.value;
				}
				return e;
			});
			localStorage.setItem("data", JSON.stringify(arrTamp));
			list = getStorage();
			renderList(list);
		}
		formElement.reset();
		delete formElement.dataset.id;
	});
})();

function getAllItem() {
	return document.querySelectorAll(".list li");
}
function checkRes(item, searchValue) {
	if(searchValue == "") return true;
	let h1Element = item.querySelector(".item-text h1");
	return h1Element.textContent.toLowerCase().includes(searchValue.toLowerCase());
}
function solveItem(allItem ,searchValue) {
	if(allItem.length == 0) return null;
	for(let i of allItem) {
		const res = checkRes(i, searchValue);
		!res ? i.style.display = "none" : i.style.display = "flex";
	}
}
function checkFilter(item, filterValue) {
	if(filterValue == "all") return true;
	return item.dataset.status == filterValue;
}
function filterItem(allItem, filterValue) {
	if(allItem.length == 0) return null;
	for(let i of allItem) {
		const res = checkFilter(i, filterValue);
		!res ? i.style.display = "none" : i.style.display = "flex";
	}
}
function handleItem(searchValue, filterValue) {
	var allItem = getAllItem();
	var handleURL = new URL(window.location);
	handleURL.searchParams.set("searchValue" , searchValue);
	handleURL.searchParams.set("filterValue" , filterValue);
	window.history.pushState({}, "", handleURL);
	if(filterValue == "all") {
		solveItem(allItem, searchValue);
		return;
	}
	if(searchValue == "") {
		filterItem(allItem, filterValue);
		return;
	}
	var arrItem = Array.from(allItem).filter(e => e.dataset.status == filterValue);
	if(arrItem.length == 0) {
		Array.from(allItem).forEach(e => {
			e.style.display = "none";
		});
		return;
	}
	var arrItem2 = Array.from(allItem).filter(e => e.dataset.status != filterValue);
	arrItem.forEach(e => {
		e.style.display = "flex";
	});
	arrItem2.forEach(e => {
		e.style.display = "none";
	})
	solveItem(arrItem, searchValue);
}
(() => {
	let searchInput = document.querySelector("#searchInput");
	let filterInput = document.querySelector(".select");
	let handleURL = new URL(window.location);
	let handleSearchValue = handleURL.searchParams.get("searchValue");
	let handleFilterValue = handleURL.searchParams.get("filterValue")
	searchInput.value = handleSearchValue;
	filterInput.value = handleFilterValue;
	handleItem(handleSearchValue, handleFilterValue);
	searchInput.addEventListener("input", () => {
		handleItem(searchInput.value, filterInput.value);
	});
	filterInput.addEventListener("change", () => {
		handleItem(searchInput.value, filterInput.value);
	});
})();