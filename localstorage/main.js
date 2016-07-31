'use strict';
$(() => {
  $('#nameForm').submit(addName);
  let names = namesFromStorage();
  let $lis = names.map(name => createLi(name))
  //console.log(names)
  //let $lis =createlist(names);
  $('#list').append($lis);
  $('#list').on('dblclick','li',removeName)
  $('#editNameForm').submit(saveUpdate);

//$('#addName').click(addName);

//$('#myColor').change(changeColor);
});


function saveUpdate(){
  let index =  $('#nameEditModal').data('index');
  let newName = $('#editName').val();
}

function openEditModal(){
    let index = $(this).parent().index();
    let name =$(this).parent
    $('#nameEditModal').data('index',index);
    $('#nameEditModal').modal();
}

function removeName(){
  console.log('this:',this);
  let index = $(this).index();
  removeFromStorage(index);
  $(this).remove();
  //$(this).remove();

  //remove from storage
}

function removeFromStorage(index){
  let names=namesFromStorage();
  names.splice(index,1);
  writeToStorage(names);
}

function addName(event){
                          event.preventDefault();
                          //event.stopPropagation();
                          //console.log("click");
                          let name =$('#newName').val();
                          $('#newName').val('');
                          //localStorage.name = name;

                          //let $li=$('<li>').text(name);
                          let $li =createLi(name);
                          $('#list').append($li);
                          addToStorage(name);
                        }


function createLi(name) {
 let $li=$('#template').clone();
  $li.removeAttr('id');
  $li.children('.name').text(name);
  return $li


}
function createlist(names){
  console.log(names);
  //takes an array of string an return an array of jquer elements 
  return names.map(name =>  $('<li>').text(name));
}

function changeColor(){
  let color =$('#myColor').val();
  console.log("color",color);
  $('body').css('background-color',color);
}


function addToStorage(name){
  //1.Read 2.Parse  
  let names = namesFromStorage();
  //3.Modify
  console.log(names);
  names.push(name);
  //4.Stringify 5.write 
  writeToStorage(names);

}

function writeToStorage(names){
  localStorage.names = JSON.stringify(names);
}


function namesFromStorage(){
  //read and parse

  //read
  let json = localStorage.names;
  let names;
  //parse
  try{
    names = JSON.parse(json);
  }
  catch(e){
    names = [];
  }
  return names;
}
