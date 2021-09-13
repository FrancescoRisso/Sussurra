const ID = "64835c90-7122-4c59-9031-5f51d9528c33";
const tag = "dado1";
const giri_inutili = 8;
const tempo_tra_giri_dadi = 200;

const dadi_svg = [
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> </g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse stroke-width="0" ry="10" rx="10" id="svg_1" cy="50" cx="50" stroke="#000" fill="#619E73"/></g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse stroke-width="0" ry="10" rx="10" id="svg_1" cy="33" cx="33" stroke="#000" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_2" cy="67" cx="67" fill="#619E73"/> </g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse fill="#619E73" stroke="#000" cx="25" cy="25" id="svg_1" rx="10" ry="10" stroke-width="0"/> <ellipse fill="#619E73" cx="50" cy="50" id="svg_2" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="75" cy="75" id="svg_3" rx="10" ry="10" stroke-width="0" stroke="#000"/> </g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse fill="#619E73" stroke="#000" cx="30" cy="30" id="svg_1" rx="10" ry="10" stroke-width="0"/> <ellipse fill="#619E73" cx="30" cy="70" id="svg_2" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="70" cy="70" id="svg_3" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="70" cy="30" id="svg_4" rx="10" ry="10" stroke-width="0" stroke="#000"/> </g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse fill="#619E73" stroke="#000" cx="30" cy="30" id="svg_1" rx="10" ry="10" stroke-width="0"/> <ellipse fill="#619E73" cx="30" cy="70" id="svg_2" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="70" cy="70" id="svg_3" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="70" cy="30" id="svg_4" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="50" cy="50" id="svg_5" rx="10" ry="10" stroke-width="0" stroke="#000"/> </g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse stroke-width="0" ry="10" rx="10" id="svg_1" cy="25" cx="33" stroke="#000" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_2" cy="75" cx="33" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_3" cy="50" cx="67" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_4" cy="25" cx="67" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_5" cy="50" cx="33" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_6" cy="75" cx="67" fill="#619E73"/> </g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse fill="#619E73" stroke="#000" cx="25" cy="25" id="svg_1" rx="10" ry="10" stroke-width="0"/> <ellipse fill="#619E73" cx="25" cy="75" id="svg_2" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="75" cy="50" id="svg_3" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="75" cy="25" id="svg_4" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="25" cy="50" id="svg_5" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="75" cy="75" id="svg_6" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="50" cy="50" id="svg_7" rx="10" ry="10" stroke-width="0" stroke="#000"/> </g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse stroke-width="0" ry="10" rx="10" id="svg_1" cy="25" cx="25" stroke="#000" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_2" cy="75" cx="25" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_3" cy="50" cx="75" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_4" cy="25" cx="75" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_5" cy="50" cx="25" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_6" cy="75" cx="75" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_7" cy="37.5" cx="50" fill="#619E73"/> <ellipse stroke="#000" stroke-width="0" ry="10" rx="10" id="svg_8" cy="62.5" cx="50" fill="#619E73"/> </g></svg>`,
	`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <ellipse fill="#619E73" stroke="#000" cx="25" cy="25" id="svg_1" rx="10" ry="10" stroke-width="0"/> <ellipse fill="#619E73" cx="25" cy="75" id="svg_2" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="75" cy="50" id="svg_3" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="75" cy="25" id="svg_4" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="25" cy="50" id="svg_5" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="75" cy="75" id="svg_6" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="50" cy="50" id="svg_7" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="50" cy="25" id="svg_8" rx="10" ry="10" stroke-width="0" stroke="#000"/> <ellipse fill="#619E73" cx="50" cy="75" id="svg_9" rx="10" ry="10" stroke-width="0" stroke="#000"/> </g></svg>`
];

let div;

const random = () => {
	return Math.floor(Math.random() * 10);
};

const display = (n) => {
	div.innerHTML = dadi_svg[n];
};

const roll = () => {
	let count = 1;
	display(random());
	let timer = setInterval(() => {
		display(random());
		count++;
		if (giri_inutili == count) clearInterval(timer);
	}, tempo_tra_giri_dadi);
};

const load = () => {
	console.log("Loading");
	let container = document.getElementById(ID);
	div = document.createElement("div");
	div.style.borderStyle = "solid";
	div.style.borderColor = "#619E73";
	div.style.borderRadius = "10px";

	container.addEventListener("click", roll);
	container.appendChild(div);
};

load();
