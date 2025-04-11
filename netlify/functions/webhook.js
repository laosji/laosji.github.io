const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${error.message}`,
    };
  }

  // 处理成功的支付事件
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    
    // 您可以在此处添加逻辑，如记录支付、发送邮件通知等
    console.log(`支付成功: ${session.metadata.articleTitle}`);
    
    // 这里可以添加数据库操作，如果您有需要的话
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};