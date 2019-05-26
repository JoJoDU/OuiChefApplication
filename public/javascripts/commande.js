$(document).ready(function() {
    $(".add").click(function() {
      var t = $(this).parent().find('input[class*=text_box]');
      if(t.val()==""||undefined||null){
        t.val(0);
      }
      t.val(parseInt(t.val()) + 1)
      setTotal();
    })
    $(".min").click(function() {
      var t = $(this).parent().find('input[class*=text_box]');
      if(t.val()==""||undefined||null){
        t.val(0);
      }
      t.val(parseInt(t.val()) - 1)
      if(parseInt(t.val()) < 0) {
        t.val(0);
      }
      setTotal();
    })
    $(".delete").click(function(){
      var t = $(this).parent().parent('td').remove();
      //console.log($(this).parent().parent('tr'));
      setTotal();
    })
    $(".text_box").keyup(function(){
      var t = $(this).parent().find('input[class*=text_box]');
      if(parseInt(t.val())==""||undefined||null || isNaN(t.val())) {
        t.val(0);
      }
      setTotal();
    })
    function setTotal() {
      var s = 0;
      $("#tab td").each(function() {
        var t = $(this).find('input[class*=text_box]').val();
        var p = $(this).find('span[class*=price]').text();
        if(parseInt(t)==""||undefined||null || isNaN(t) || isNaN(parseInt(t))){
          t=0;
        }
        console.log(p);
        s += parseInt(t) * parseFloat(p);
        sessionStorage.setItem("totalPay",s);
      });
      $("#total").html(s.toFixed(2));
    }
    setTotal();
  })