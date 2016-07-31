'use strict';

$(() => {
  let names = namesFromStorage();
  let $lis = names.map(name => createLi(name));
  $('#list').append($lis);

  $('#list').on('dblclick', 'li', removeName);
  $('#list').on('click', 'button.edit', openEditModal);

  $('#editNameForm').submit(saveUpdate);
  $('#nameForm').submit(addName);
});

function saveUpdate() {
  let index = $('#nameEditModal').data('index');
  let newName = $('#editName').val();
  // TODO:  Update storage with new name,
  //        and update DOM
  
}

function openEditModal() {
  let index = $(this).parent().index();
  let name = $(this).siblings('span').text();

  $('#editName').val(name);
  $('#nameEditModal').data('index', index);
  $('#nameEditModal').modal();
}

function removeName() {
  let index = $(this).index();
  removeFromStorage(index);
  $(this).remove();
}

function removeFromStorage(index) {
  let names = namesFromStorage();
  names.splice(index, 1);
  writeToStorage(names);
}

function addName(event) {
  event.preventDefault();

  let name = $('#newName').val();
  $('#newName').val('');

  let $li = createLi(name);
  $('#list').append($li);
  addToStorage(name);
}

function createLi(name) {
  let $li = $('#template').clone();
  $li.removeAttr('id');
  $li.children('.name').text(name);
  return $li;
}

function addToStorage(name) {
  // 1. Read
  // 2. Parse
  let names = namesFromStorage();

  // 3. Modify
  names.push(name);

  // 4. Stringify
  // 5. Write
  writeToStorage(names);
}

function writeToStorage(names) {
  localStorage.names = JSON.stringify(names);
}

function namesFromStorage() {
  // read 
  let json = localStorage.names;
  let names;

  // parse
  try {
    names = JSON.parse(json);
  } catch(e) {
    names = [];
  }

  return names;
}
