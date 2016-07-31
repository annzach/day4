'use strict';


$(() => {
  //debugger;
   // extractObject();

  $('#nameForm').submit(addDetails);
  let $rows = contacts.map(personDetails => createRow(personDetails));
  var contacts=[];
  $('#editNameForm').submit(saveUpdate);
  $('#head').on('dblclick', '.temp', removeDetails);

/*  function createRow(personDetails){
  extractObject()
  let $row = $('#template').clone();
  $row.removeAttr('id');
  $row.children('.name').text(name);
  return $row;
}*/
  let con = detailsFromStorage();
  $button=$('<button>').text(EDIT);
  $button.attr("bthnid");
  con.append('#bthnid');
  let $tds =con.map(details=> createTD());
  $('#temp').append($tds);
 });

function createTD(details) {
  let $td = $('#template').clone();
  $td.removeAttr('id');
  $td.children('.temp').text(con);
  
  return $td;
}

function removeDetails() {
  debugger;
  console.log("inside removeName");
  let index = $(this).index();
  removeFromStorage(index);
  $(this).remove();
}

function removeFromStorage(index) {
  console.log("inside removeFromStorage");
  let det = detailsFromStorage();
  det.splice(index, 1);
  writeToStorage(det);
}

function saveUpdate() {
  let index = $('#nameEditModal').data('index');
  let newName = $('#editName').val();
        
  
}

function extractObject(){
  var obj = JSON.parse(localStorage.personInfo);
  console.log('extractedobj',obj);
  $('#head').empty();
  for(var i = 0; i<obj.length;i++){
  let $row = $('#template').clone();
     $row.removeAttr('id');
     $row.find('#nameForTable').text(obj[i].personname);
     $row.find('#phonForTable').text(obj[i].Number);
     $row.find('#emailForTable').text(obj[i].email);
     $row.find('#addForTable').text(obj[i].add);
    console.log("template",$row);
    $('#head').append($row);

    //obj[i].personname
  }
}



function addDetails() {
  console.log("inside func!!!");
  event.preventDefault();

  let name = $('#newName').val();
  let phoneNumber = $('#newphoneNum').val();
  let address = $('#newAddress').val();
  let emailId = $('#newemailId').val();
  let personDetails = {"personname":name,"Number":phoneNumber, "add":address, "email":emailId};
  let jsonObj = JSON.stringify(personDetails);
  console.log(jsonObj);
  addToStorage(personDetails);

  //;
}

function addToStorage(jsonObj){
  console.log("inside add");

  let contacts =  detailsFromStorage();
  contacts.push(jsonObj);
  console.log("contacts:", contacts);

  writeToStorage(contacts);

}

function writeToStorage(contacts){
  console.log("inside write");
  localStorage.personInfo=JSON.stringify(contacts);
  extractObject();

}

function detailsFromStorage(){
    //read and parse

  //read
  let json = localStorage.personInfo;
 let details;
  //parse
  try{
    details = JSON.parse(json);

  }
  catch(e){
    details = [];
  }
  console.log("detailsFromStorage",details)
  return details;
}
