const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { amount, articleTitle, articleUrl } = JSON.parse(event.body);
    
    // 创建支付意图
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cny',
            product_data: {
              name: `打赏: ${articleTitle}`,
              description: `感谢您对文章的支持`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: articleUrl,
      metadata: {
        articleTitle,
        articleUrl,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};