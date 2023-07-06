const formLoginEl = document.querySelector("#login-form");
const modalValidationLogin = $(".modal-validation");

formLoginEl.addEventListener("submit", (event) => {
	event.preventDefault();
	let empty = false;
	let input = $(".konten").find("input");
	input.each((index, el) => {
		if ($(el).val() === "") {
			empty = true;
		}
	});
	if (empty) {
		modalValidationLogin.css('opacity', '1');
		modalValidationLogin.css('visibility','visible');
	} else {
		formLoginEl.submit();
	}
})
function closemasuk(){
	modalValidationLogin.css('opacity', '0');
	modalValidationLogin.css('visibility','hidden');
}
