
    $(document).ready(function(){
      var total = parseFloat(localStorage.totalPrice);
      console.log(total);
      $("#total").append('<br>'+localStorage.totalPrice+' euros.');
      if(total){
        var stripe = Stripe('pk_test_0uNJ9oWLQxo7tH6a7uAhic9S00O4wEvplb');
        var elements = stripe.elements();
        var cardElement = elements.create('card');
        cardElement.mount('#card-element');
        var cardholderName = document.getElementById('cardholder-name');
        var cardButton = document.getElementById('card-button');
        var clientSecret = cardButton.dataset.secret;

        cardButton.addEventListener('click', function(ev) {
          stripe.handleCardPayment(
            clientSecret, cardElement, {
              payment_method_data: {
                billing_details: {name: cardholderName.value}
              }
            }
          ).then(function(result) {
            if (result.error) {
              // Display error.message in your UI.
              alert("Il y a un erreur du paiement, veuillez réessayer plus tard.");
              window.location = 'map';
            } else {
              // The payment has succeeded. Display a success message.
              window.location = 'payReussi';
            }
          });
        });
      }
      else{
        alert("Il y a une ereur!");
        window.location = 'map';
      }
    })