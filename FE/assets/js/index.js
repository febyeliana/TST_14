const cari = async () => {
	let $ = (id) => document.getElementById(id);
	let alamatElem = $('alamat');
	let ina = alamatElem.value;

	let result = await fetch('http://3.210.119.72:5001/weather?key=AIzaSyCxQy3DFnDxNh3D_E8c0c1rrno_U_lzTcQ&query=' +ina);
	let json = await result.json();
  	let item = json;

  	if (item.status_code >= 400 && item.status_code < 500 ) {
    alert(item.message);
    return;
  	}
	
	let hasilElem = $('hasil');
	hasilElem.value = item.weather[0].description;

	let suhuElem = $('suhu');
	suhuElem.value = item.main.temp;

	let tekElem = $('tek');
	tekElem.value = item.main.pressure;

	let lembabElem = $('lembab');
	lembabElem.value = item.main.humidity;

	loadData();
}

const createRow = (i, waktu, cuaca, suhu, tek, lembab) => {
	let numCell = document.createElement('td');
	numCell.innerText = i;

	let waktuCell = document.createElement('td');
	waktuCell.innerText = waktu;
	waktuCell.className = "waktu";

	let cuacaCell = document.createElement('td');
	cuacaCell.innerText = cuaca;
	cuacaCell.className = "cuaca";

	let suhuCell = document.createElement('td');
	suhuCell.innerText = suhu;
	suhuCell.className = "suhu";

	let tekCell = document.createElement('td');
	tekCell.innerText = tek;
	tekCell.className = "tek";

	let lembabCell = document.createElement('td');
	lembabCell.innerText = lembab;
	lembabCell.className = "lembab";

	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(waktuCell);
	row.appendChild(cuacaCell);
	row.appendChild(suhuCell);
	row.appendChild(tekCell);
	row.appendChild(lembabCell);
	let table = document.getElementById('forecastTable');
	table.appendChild(row);
};

const loadData = async () => {
	let $ = (id) => document.getElementById(id);
	let alamatElem = $('alamat');
	let ina = alamatElem.value;
	let result = await fetch('http://3.210.119.72:5001/forecast?key=AIzaSyCxQy3DFnDxNh3D_E8c0c1rrno_U_lzTcQ&query=' + ina);
	let json = await result.json();
	let list = json.list;

	if (json.status_code >= 400 && json.status_code <= 500 ) {
	    alert(json.message);
	    return;
  	}

	let table = document.getElementById('forecastTable');
	table.innerHTML = '';
	let i = 1;
	for (let data of list) {
		createRow(i, data.dt_txt, data.weather[0].description, data.main.temp, data.main.pressure, data.main.humidity);
		i++;
	}
};