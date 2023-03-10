function resLi(obj) {
	const templateElement = document.getElementById("template");
	if(!templateElement) return null;
	const liElement = templateElement.content.firstElementChild.cloneNode(true);
	if(!liElement) return null;
	const h1Element = liElement.querySelector("h1");
	if(!h1Element) return null;
	h1Element.textContent = obj.name;
	h1Element.id = obj.id;
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
 		console.log(checkText);
 		finishButton.textContent = checkText;
 	});
 	removeButton.addEventListener("click", () => {
 		liElement.remove();
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

(() => {
	const list = [
		{id: 1, name: "Learn JS", status: "pending"},
		{id: 2, name: "Learn Nodejs", status: "completed"},
		{id: 3, name: "Learn GIT", status: "pending"},
	];
	renderList(list);
})()