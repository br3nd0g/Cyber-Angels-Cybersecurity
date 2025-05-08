function saveChecked(form){

    var data = {};

    const columns = form.children[0].children;

    for (var i = 0;i < columns.length;i++) {

        const column = columns[i];

        for (var x = 0;x < column.children.length;x++) {
            
            const checklistItem = column.children[x]

            const checkbox = checklistItem.getElementsByTagName('input')[0];
            
            data[checkbox.id] = checkbox.checked;
        }
    }
    
    saveObject(data);
}

function saveObject(object){

    var jsonString;

    if(typeof object === "object"){
        jsonString = JSON.stringify(object, null, 2);
    }

    const blob = new Blob([jsonString], {
        type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'checklist_data.json';
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
}

function loadFile(){

    var files;
    var data;

    var inputElmnt = document.createElement('input');
    inputElmnt.type="file";

    setTimeout(function(){
        inputElmnt.click();
    },200);

    inputElmnt.onchange = ()=>{

        files = inputElmnt.files;
        if(files){
            if (files.length <= 0) {
                alert("No file submitted or Empty file.");
            }
            else{
                var reader = new FileReader();
                
                reader.onload = ()=>{
                    try{
                        data = JSON.parse(reader.result);
                        modifyChecklistFromData(data);
                    }catch{
                        alert("File uploaded is not .json");
                    }
                };

                reader.readAsText(files[0]);
            }
        
            inputElmnt.remove();

        }
    };
}

function modifyChecklistFromData(data){

    Object.entries(data).map(entry => {
        document.getElementById(entry[0]).checked = entry[1];
    });
}