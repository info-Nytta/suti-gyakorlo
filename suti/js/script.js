/* általános "teendők" */

function outText(id,szoveg) {
	document.getElementById(id).innerHTML=szoveg;
}
function hide(id) {
	document.getElementById(id).style.display="none";
}

/* általános sütikezelés */

// létrehozás/ beállítás - ez bővíthető mindenféle paraméterrel
function setCookie(nev,ertek) {
	document.cookie=nev+"="+ertek;
}
// adott süti létezik-e? igen: sütiérték, nem: üres karaktersorozat
function getCookie(nev) {
	let sutik = document.cookie.split(';');
	let i=0;
	let jonev=false;
	let ertek="";
	while(i<sutik.length && !jonev) {
		let egysuti = sutik[i].split('=');
		jonev= (egysuti[0].trim()==nev);
		ertek=egysuti[1];
		i++;
	}
	if (!jonev) ertek="";
	return ertek;
}
// törlés: adunk egy régi érvényességi dátumot paraméterként
function delCookie(nev) {
	document.cookie = ""+nev+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

/* oldal működése */

// ismerjük a látogató nevét? igen: köszönés, nem: név bekérése
function checkName() {
	let fnev=getCookie("felhasznalo");
	let szoveg="";
	if (fnev!="")
		szoveg="<p>Üdv "+fnev+"!</p>"+
		"<p>Utolsó látogatásod: "+getCookie("mikor")+"</p>";
	else
		szoveg="<p>Én vagyok a Számítógép! Te ki vagy?</p>"+
		"<input type='text' id='user'>"+
		"<button onclick='inputName()'>Bemutatkozom</button>";
	outText("nev",szoveg);
}
// Elfogadta már a sütiket? nem: info megjelenítése
function cookieInfo() {
	if (getCookie("ok")=="")
		outText("info",""+
		"Az oldal sütiket használ"+
		"<button onclick='ok()'>OK</button>");
}
// Időbélyeg
function setUserDate() {
	let most=new Date();
	let ev= most.getFullYear();
    let ho= most.getMonth()+1;	// 0-tól sorszámozza a hónapokat
    let nap= most.getDate();
	let ora= most.getHours();
    let perc= most.getMinutes();
	setCookie("mikor",ev+"-"+ho+"-"+nap+" "+ora+":"+perc);
}

/* gombok történései */

// Bemutatkozás
function inputName() {
	let fnev=document.getElementById("user").value;
	if (fnev!="") {
		setCookie("felhasznalo",fnev);
		checkName();
	}
}
// OK
function ok() {
	setCookie("ok","ok");
	hide("info");
}


/* alap beállítások az oldal betöltésekor */

function init() {
	checkName();
	cookieInfo();
	setUserDate();
}