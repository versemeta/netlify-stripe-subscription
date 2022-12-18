const content = {
  free: {
    src:
      'https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=600&h=600&q=80',
    alt: 'corgi in the park with a sunset in the background',
    credit: 'Jacob Van Blarcom',
    creditLink: 'https://unsplash.com/photos/lkzjENdWgd8',
    message: 'To view this content, you need to create an account!',
    allowedRoles: ['free', 'pro', 'premium'],
  },
  pro: {
    src:
      'https://images.unsplash.com/photo-1519098901909-b1553a1190af?auto=format&fit=crop&w=600&h=600&q=80',
    alt: 'close-up of a corgi with its tongue hanging out',
    credit: 'Florencia Potter',
    creditLink: 'https://unsplash.com/photos/yxmNWxi3wCo',
    message:
      'This is protected content! It’s only available if you have a pro plan or higher.',
    allowedRoles: ['pro', 'premium'],
  },
  premium: {
    src:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png',
    alt: 'BUY NOW',
    credit: 'SWAP',
    creditLink: 'https://poocoin.app/tokens/0xede535a36f5e5082eef5e49bfda4c6a5da465746',
    message:
      'Swap Pancake PCS.',
    allowedRoles: ['premium'],
  },
};

exports.handler = async (event, context) => {
  const { type } = JSON.parse(event.body);
  const { user } = context.clientContext;
  const roles = user ? user.app_metadata.roles : false;
  const { allowedRoles } = content[type];

  if (!roles || !roles.some((role) => allowedRoles.includes(role))) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        src:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/121px-Telegram_2019_Logo.svg.png',
        alt: 'corgi in a crossed circle with the text “subscription required”',
        credit: 'Group Telegram',
        creditLink: 'https://t.me/FalconBSC',
        message: `Group Telegram.`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(content[type]),
  };
};
