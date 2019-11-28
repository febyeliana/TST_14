const cari = async () => {
	let $ = (id) => document.getElementById(id);
	let alamatElem = $('alamat');
	let ina = alamatElem.value;

	let result = await fetch('http://localhost:5001/weather?key=AIzaSyCxQy3DFnDxNh3D_E8c0c1rrno_U_lzTcQ&query=' +ina);
	let json = await result.json();
  	let item = json;
	
	let hasilElem = $('hasil');
	hasilElem.value = item.weather[0].description;

	loadData();
}

const createRow = (i, waktu, cuaca) => {
	let numCell = document.createElement('td');
	numCell.innerText = i;

	let waktuCell = document.createElement('td');
	waktuCell.innerText = waktu;
	waktuCell.className = "waktu";

	let cuacaCell = document.createElement('td');
	cuacaCell.innerText = cuaca;
	cuacaCell.className = "cuaca";

	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(waktuCell);
	row.appendChild(cuacaCell);
	let table = document.getElementById('forecastTable');
	table.appendChild(row);
};

const loadData = async () => {
	let $ = (id) => document.getElementById(id);
	let alamatElem = $('alamat');
	let ina = alamatElem.value;
	let result = await fetch('http://localhost:5001/forecast?key=AIzaSyCxQy3DFnDxNh3D_E8c0c1rrno_U_lzTcQ&query=' + ina);
	let json = await result.json();
	let list = json.list;

	let table = document.getElementById('forecastTable');
	table.innerHTML = '';
	let i = 1;
	for (let data of list) {
		createRow(i, data.dt_txt, data.weather[0].description);
		i++;
	}
};