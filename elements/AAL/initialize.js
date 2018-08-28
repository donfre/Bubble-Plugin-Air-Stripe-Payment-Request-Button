function(instance, context) {
  const stripe = Stripe(context.keys["Stripe Publishable Key"]);
  instance.data.stripe = stripe;
  
  var uniqueid = 'paymentrb'+(Math.random() * Math.pow(2, 54)).toString(18);
  var div = $('<div id="'+uniqueid+'"> <!-- A Stripe Element will be inserted here. --> </div>');
  instance.canvas.append(div);
  instance.data.div = div;
  instance.data.uniqueid = uniqueid;
  

}