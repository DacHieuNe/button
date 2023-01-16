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
	return liElement;
}
function renderList(list) {
	const ulElement = document.querySelector(".list");
	if(!ulElement) return null;

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
	if(!localStorage.getItem("data") || JSON.parse(localStorage.getItem("data")).length == 0) {
		localStorage.setItem("data",JSON.stringify([
			{id: 1, name: "Learn JS", status: "pending"},
			{id: 2, name: "Learn Nodejs", status: "completed"},
			{id: 3, name: "Learn GIT", status: "pending"},
			]));	
	}
	const list = getStorage();
	renderList(list);
})()