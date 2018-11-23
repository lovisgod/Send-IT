$('.signup-form').hide();
$('.signup').css('background', 'grey');
$('.reset-form').hide();

$('.login').click(() => {
  $('.signup-form').hide();
  $('.login-form').show();
  $('.signup').css('background', 'grey');
  $('.login').css('background', '#CBE173');
});


$('.signup').click(() => {
  $('.signup-form').show();
  $('.login-form').hide();
  $('.login').css('background', 'grey');
  $('.signup').css('background', '#CBE173');
});

$('#reset-button').click(() => {
  $('.signup-form').hide();
  $('.login-form').hide();
  $('.reset-form').show();
  $('.login').hide();
  $('.signup').hide();
});

$('.card1').click(() => {
  window.location.href = '../order_details.html';
});
$('.card2').click(() => {
  window.location.href = '../order_details.html';
});
$('.card3').click(() => {
  window.location.href = './../order_details.html';
});

$('.admin_card1').click(() => {
  window.location.href = '../admin_order_details.html';
});
$('.admin_card2').click(() => {
  window.location.href = '../admin_order_details.html';
});
$('.admin_card3').click(() => {
  window.location.href = '../admin_order_details.html';
});

$('.btn').click(() => {
  window.location.href = '../order_history.html';
});

$('.btn_admin').click(() => {
  window.location.href = '../admin_profile.html';
});
