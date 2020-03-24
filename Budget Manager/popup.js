$(function() {
  chrome.storage.sync.get(['total','limit'], function() {
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
  })


  $('#spendAmount').click(function(){
    chrome.storage.sync.get(['total','limit'],function(budget){
      var newTotal = 0;
      if (budget.total) {
        newTotal+=parseInt(budget.total);
      }
      var amount = $('#amount').val();
      if(amount)
      {
        newTotal+=parseInt(amount);
      }
      chrome.storage.sync.set({'total':newTotal},function(){
        if(amount && newTotal>=budget.limit){
          var notifoptions = {
            type:'basic',
            iconUrl:'chrome48.png',
            title: 'Limit Reached!',
            message:"Uh oh!Looks like your limit is over"
          };
          chrome.notifications.create('limitNotif', notifoptions);
        }
      });

      $('#total').text(newTotal);
      $('amount').val('');
    });
  });
});
