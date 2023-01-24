const { Telegraf, Markup, Scenes, session } = require('telegraf');
require('dotenv').config()
const text = require('./const');
const oput = require('./oput');
const anonim = require('./anonim');

const bot = new Telegraf('5869058937:AAH3kWPtduDnGYMHn6seheAUA4byi1UvWm4');

const stage = new Scenes.Stage([oput, anonim])


bot.use(session())
bot.use(stage.middleware())


bot.hears('\u{1F3E5} опитування', ctx => ctx.scene.enter('oput'))
bot.hears('тест опитування', ctx => ctx.scene.enter('anonim'))

bot.hears('\u{270F} опитування', ctx => ctx.sendMessage('Виберіть опитування', {
    reply_markup: {
        keyboard: [
           [
                {text:'тест опитування'},
                {text:'\u{1F3E5} опитування'},
            ], [
                {text:'Назад'}
            ]
        ]
    }
}))


bot.hears('\u{2139}   Про нас', (ctx) => ctx.replyWithHTML(text.onas));
bot.hears('\u{1F404}  Контакти', (ctx) => ctx.replyWithHTML(text.contacts));
bot.hears('\u{1F608} Просто кнопка', (ctx) => ctx.replyWithHTML(text.button));

bot.hears('\u{1F4DD}  Запис на прийом', (ctx) => ctx.replyWithHTML('Запис \u{2B07}',{
    reply_markup: {
        inline_keyboard: [
           [
                {text:'Запис на прийом', url: 'envaki.github.io'}  
            ]
        ]
    }
}));


bot.hears('Назад', async ctx => {
    try {
        await bot.telegram.sendMessage(ctx.chat.id, '\u{1F3E3}  Головне меню',
        { 
            reply_markup: {
                keyboard: [
                   [
                        {text:'\u{2139}   Про нас'},
                        {text:'\u{1F404}  Контакти', callback_data: 'contacts'} 
                    ],
                    [
                        {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'},
                        {text:'\u{270F} опитування'}   
                    ],
                    [
                        {text:'\u{1F608} Просто кнопка', callback_data: 'button'}
                    ]
                ]
            }
    })
    } catch (e) {
        console.error(e)
    }
})


bot.command('start', async ctx => {
    try {
        await bot.telegram.sendMessage(ctx.chat.id, '\u{1F3E3}  Вас вітає бот ЦПМСД Житомира',
        { 
            reply_markup: {
                keyboard: [
                   [
                        {text:'\u{2139}   Про нас'},
                        {text:'\u{1F404}  Контакти', callback_data: 'contacts'} 
                    ],
                    [
                        {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'},
                       // {text:'\u{1F437} Свиня'}   
                       {text:'\u{270F} опитування'} 
                    ],
                    [
                        {text:'\u{1F608} Просто кнопка'}
                    ]
                ]
            }
    })
    } catch (e) {
        console.error(e)
    }
})

bot.on('message', async ctx => {
        await ctx.reply('я тебе не розумію, скористайся меню \u{1F61F}', {
            reply_markup: {
                keyboard: [
                   [
                        {text:'\u{2139}   Про нас'},
                        {text:'\u{1F404}  Контакти', callback_data: 'contacts'} 
                    ],
                    [
                        {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'},
                        {text:'\u{270F} опитування'}   
                    ],
                    [
                        {text:'\u{1F608} Просто кнопка'}
                    ]
                ]
            }
        })
});

bot.action('about', async ctx => {
    try {
    await ctx.deleteMessage();
    await  ctx.replyWithHTML(text.onas)
    await bot.telegram.sendMessage(ctx.chat.id, 'Повернутися',
    { 
        reply_markup: {
            keyboard: [
                [
                    {text:'До головного меню', callback_data: 'menu'},
                ]
            ]
        }
})
    } catch (e) {
        console.error(e)
    }
})



bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
