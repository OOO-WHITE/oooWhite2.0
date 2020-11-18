let check = true;
function f() {
	check = !check;
	btn = document.getElementById('b');
	if (check) {
		btn.style.backgroundColor = "#e8793e";
	}
	else {
		btn.style.backgroundColor = "#800000"
	}
}