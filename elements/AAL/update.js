function(instance, properties, context) {
  var div = instance.data.div;
  var uniqueid = instance.data.uniqueid;
  
  var paymentRequest = instance.data.stripe.paymentRequest({
      country: properties.country,
      currency: properties.currency,
      total: {
        label: properties.label,
        amount: properties.amount,
      },
      //displayItems:{[]},
      requestPayerName: properties.payer_name,
      requestPayerEmail: properties.payer_email,
      requestPayerPhone: properties.payer_phone
  	});
  
  function createElement(){
    var elements = instance.data.stripe.elements();
    var prButton = elements.create('paymentRequestButton', {
      paymentRequest: paymentRequest,
      style: {
        paymentRequestButton: {
          type: properties.type,//'default' | 'donate' | 'buy', // default: 'default'
          theme: properties.theme, //'dark' | 'light' | 'light-outline', // default: 'dark'
          height: properties.height // default: '40px', the width is always '100%'
        }
      },
      
    });

    // Check the availability of the Payment Request API first.
    paymentRequest.canMakePayment().then(function(result) {
      if (result) {
        prButton.mount('#'+uniqueid);
        instance.publishState('can_make_payment',true);
      } else {
        document.getElementById(uniqueid).style.display = 'none';
        instance.publishState('can_make_payment',false);
      }
    });
    
    paymentRequest.on('token', function(ev) {
      instance.data.paymentResponse = ev;
      instance.publishState('card_token',ev.token.id);
      instance.triggerEvent('card_token_created');
	});
    
  }
  
  $(document).ready(createElement);


}