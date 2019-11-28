//window.localStorage.setItem('alamat', alamat.value);

const cari = async () => {
	let $ = (id) => document.getElementById(id);
	let alamatElem = $('alamat');
	let ina = alamatElem.value;

	let result = await fetch('http://localhost:5001/weather?key=AIzaSyCxQy3DFnDxNh3D_E8c0c1rrno_U_lzTcQ&query=' +ina);
	console.log(result);
	let json = await result.json();
	console.log(json);
  	let item = json;
	
	let hasilElem = $('hasil');
	hasilElem.value = item.weather[0].description;


}