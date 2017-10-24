'use strict';
// INITIALISE THE APP
// We are creating an object called appState where we will be listing
// all of the things necessary for our app to show and display!
const appState={
  foodList:[],
  showFoodList:true
};
//STATE MOD(S)
function initialiseCheesecakePage(state){
  state.showFoodList=true;
}
//RENDER
function render(state){
  let presentFoodList='';
  let htmlDisplay=''; // We will be populating all of our info into HTML!
  if(state.showFoodList===true){
    state.foodList.forEach(element=>{
      if(element.active===true){
        htmlDisplay += `<div class="show-food-list"><div class="cheesecake-list">${element.cheesecake_result}</div></div>`;
      }
    }); 
    $('.display-info').html(htmlDisplay);
  }
  else{
    presentFoodList+='<p>No favourite cheesecake types displayed</p>';
  }
}
// EVENT HANDLER(S)
function eventHandlers(){
  $('.simple-form').submit(function(event) {
    event.preventDefault();
    const cheesecake_result=$('#cheesecake').val();
    const data = {cheesecake_result};
    $.ajax({
      url: '/DATABASE_TABLE_HERE',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(json){
        appState.foodList.push(json[0]);
        render(appState);
      },
    });
    render(appState);
  });
}
// LETS RETRIEVE OUR DATABASE CONTENT HERE
function getContents(){
  $.ajax({
    url: '/DATABASE_TABLE_HERE',
    type: 'GET',
    dataType: 'json',
    success: function(json){
      appState.foodList=json;
      render(appState);
    },
  });
}
// RUN THIS CUTENESS
$(function(){
  eventHandlers();
  getContents();
  render(appState,'');
});
