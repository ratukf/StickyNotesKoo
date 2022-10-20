// Select Elemen
const list = document.getElementById("list");
const input = document.getElementById("input");

// Variables
let LIST;

// Mengambil item dari local storage
let data = localStorage.getItem("NOTES");

// Checking jika data tidak kosong
if(data){ // Jika data kosong
    LIST = JSON.parse(data);
    id = LIST.length; // Set ID ke ID terakhir di list
    loadList(LIST); // Memuat list ke UI
}else{
    // Jika data tidak kosong
    LIST = [];
    id = 0;
}

// Memuat items ke UI
function loadList(array){
    array.forEach(function(item){
        addStickyNotes(item.name, item.id, item.done, item.trash);
    });
}


// Membuat fungsi add notes
function addStickyNotes(notes, id, done, trash){
    
    if(trash){ return; }
    
    const item = 
                `<li class="item">
                    <h2>${notes}</h2>
                    <i class="fa fa-trash fa-sm" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// Menambah item ke list & fungsi enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const notes = input.value;
        
        // Jika input tidak kosong
        if(notes){
            addStickyNotes(notes, id, false, false);
            
            LIST.push({
                name : notes,
                id : id,
                done : false,
                trash : false
            });
            
            // Menambah item ke localstorage
            localStorage.setItem("NOTES", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

// Hapus sticky notes
function removeStickyNotes(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


// Target items yang dibuat secara dinamis
list.addEventListener("click", function(event){
    const element = event.target; // Menampilkan elemen yang terklik dalam list 
    const elementJob = element.attributes.job.value; // Complete atau delete
    
    if(elementJob == " "){
        completeStickyNotes(element);
    }else if(elementJob == "delete"){
        removeStickyNotes(element);
    }
    
    // Menambah item ke localstorage
    localStorage.setItem("NOTES", JSON.stringify(LIST));
});