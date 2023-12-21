const Stripe = require('stripe');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const stripe = new Stripe
('sk_test_51OKMR5IP66PnlPGNf6kfjInOrtTjaUXdQvQ2owIMKulwQYBZwD7TIHNJ3eLXaosRXTM4PhvsktClh8NgWnnS9LBO00EyJ40wJn');

const createSession = async (req, res) => {
    console.log(req.params);
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Membresia'
                    },
                    unit_amount: 10000,
                    
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'https://frpnt-propiedades-sfjt-shebarolas.vercel.app/success',
        cancel_url: 'https://frpnt-propiedades-sfjt-shebarolas.vercel.app/'
    });

    // const user = await User.findByIdAndUpdate(req.params.id, {
    //     isAdmin: true,
    // });

    // const token = jwt.sign({
    //     id: user._id,
    //     isAdmin: user.isAdmin
    // });


    res.json({url: session.url});
}

module.exports = {
    createSession
}