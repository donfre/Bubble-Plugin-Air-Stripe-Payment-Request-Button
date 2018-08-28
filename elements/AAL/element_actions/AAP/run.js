function(instance, properties, context) {
  //Load any data 
  var paymentResponse=instance.data.paymentResponse; 

  //Do the operation
  if(paymentResponse!== undefined){
    paymentResponse.complete(properties.status);
  }

}