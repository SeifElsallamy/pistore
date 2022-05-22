
function loader(){
payloadsDiv = document.getElementById("payloads");
payloadsDiv.innerHTML = "";
chrome.storage.sync.get("payloads", function (obj) {  
    StoredPayloads = obj.payloads;
	
	Refresh = `<div><button id="refresh">&#8634;</button></div><br/>`;
	
	for (i=0;i<StoredPayloads.length;i++){
	payload = StoredPayloads[i];
	template = `<div><div class="leftDiv"><button name="copy">Copy</button><button name="uri">URI</button><button name="html">HTML</button></div><div class="rightDiv"><input value="${payload}"/><button name="delete" id="del_${i}">Delete</button></div></div>`
	payloadsDiv.innerHTML = payloadsDiv.innerHTML + template;
	}
	
	newPayload = `<br/><div><div class="saveDiv"><input/><button id="save">Add</button></div></div>`;
	payloadsDiv.innerHTML = payloadsDiv.innerHTML + newPayload;
	
	
	payloadsDiv.innerHTML = Refresh + payloadsDiv.innerHTML;

URIbtns = document.getElementsByName("uri");
	for (ii = 0; ii < URIbtns.length; ii++) {
		URIbtns[ii].addEventListener("click", function (){
		enc_uri(this);
		});
	}

HTMLbtns = document.getElementsByName("html");
	for (iii = 0; iii < HTMLbtns.length; iii++) {
		HTMLbtns[iii].addEventListener("click", function (){
		enc_html(this);
		});
	}
COPYbtns = document.getElementsByName("copy");
	for (iiii = 0; iiii < COPYbtns.length; iiii++) {
		COPYbtns[iiii].addEventListener("click", function (){
		copy(this);
		});
	}
DELbtns = document.getElementsByName("delete");
	for (d = 0; d < DELbtns.length; d++) {
		DELbtns[d].addEventListener("click", function (){
		delBTN(this);
		});
	}

saveBtn = document.getElementById("save");
saveBtn.addEventListener("click",function (){save(this);});

refreshBtn = document.getElementById("refresh");
refreshBtn.addEventListener("click",function (){refresh();});
});





function enc_uri(x){
	inp = x.parentElement.nextElementSibling.firstChild;
	newVal = inp.value;
	inp.value = encodeURI(newVal);
}

function enc_html(x){
	inp = x.parentElement.nextElementSibling.firstChild;
	inp.value = escapeHtml(inp.value);
}

function copy(x){
	inp = x.parentElement.nextElementSibling.firstChild;
	inp.select();
	navigator.clipboard.writeText(inp.value);
}

function delBTN(x){
	del = x.id.split("_")[1];
	StoredPayloads.splice(del, 1);
	chrome.storage.sync.set({payloads: StoredPayloads});
	loader();
}

function save(x){
	toSave = x.previousElementSibling.value;
	StoredPayloads.push(escapeHtml(toSave));
	chrome.storage.sync.set({payloads: StoredPayloads});
	loader();
}

function refresh(){
	loader();
}

function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
 
}
loader();