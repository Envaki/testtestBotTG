const { Telegraf, Markup } = require('telegraf');
require('dotenv').config()

// google 


// google end

const text = require('./const');

const bot = new Telegraf('5869058937:AAH3kWPtduDnGYMHn6seheAUA4byi1UvWm4');

bot.command('start', async ctx => {
   await bot.telegram.sendMessage(ctx.chat.id, '\u{1F3E3}  Вас вітає бот ЦПМСД Житомира',
    {
        reply_markup: {
            keyboard: [
               [
                    {text:'\u{2139}   Про нас'},
                    {text:' \u{260E}  Сайт', url: 'envaki.github.io'},
                    {text:'\u{1F404}  Контакти', callback_data: 'contacts'} 
                ],
                [
                    {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'},
                    {text:'\u{1F3E5} Опитування'}   
                ],
                [
                    {text:'\u{1F608}  Просто кнопка', callback_data: 'button'}
                ]
            ]
        }
    })
})
bot.hears('\u{1F3E5} Опитування', (ctx) => ctx.reply('Тут буде опитування'));


bot.hears('\u{2139}   Про нас', (ctx) => ctx.replyWithHTML(text.onas));
bot.hears('\u{1F404}  Контакти', (ctx) => ctx.replyWithHTML(text.contacts));
bot.hears('\u{1F608}  Просто кнопка', (ctx) => ctx.replyWithHTML(text.button));
bot.hears('\u{1F4DD}  Запис на прийом', (ctx) => ctx.replyWithHTML('Запис \u{2B07}',{
    reply_markup: {
        inline_keyboard: [
           [
                {text:'Запис на прийом', url: 'envaki.github.io'}  
            ]
        ]
    }
}));


bot.hears('\u{1F3E5} Амбулаторії', (ctx) => ctx.replyWithHTML('Введіть номер амбулаторії, наприклад: 01'));
bot.hears('\u{260E}  Сайт', (ctx) => ctx.reply('Посилання на наш сайт \u{2B07}',{
    reply_markup: {
        inline_keyboard: [
           [
                {text:'Сайт ЦПМСД', url: 'envaki.github.io'}  
            ]
        ]
    }
}
));

bot.hears('1',(ctx) => ctx.reply(text.amb[0]));
bot.hears('До головного меню', async ctx => {
    try {
        await bot.telegram.sendMessage(ctx.chat.id, '\u{1F3E3}  Вас вітає бот ЦПМСД Житомира',
        { 
            reply_markup: {
                keyboard: [
                   [
                        {text:'\u{2139}   Про нас'},
                        {text:' \u{260E}  Сайт', url: 'envaki.github.io'},
                        {text:'\u{1F404}  Контакти', callback_data: 'contacts'} 
                    ],
                    [
                        {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'},
                        {text:'\u{1F3E5} Амбулаторії'}   
                    ],
                    [
                        {text:'\u{1F608}Просто кнопка', callback_data: 'button'}
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
                        {text:' \u{260E}  Сайт', url: 'envaki.github.io'},
                        {text:'\u{1F404}  Контакти', callback_data: 'contacts'} 
                    ],
                    [
                        {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'},
                        {text:'\u{1F3E5} Амбулаторії'}   
                    ],
                    [
                        {text:'\u{1F608}Просто кнопка', callback_data: 'button'}
                    ]
                ]
            }
        })
    });

function btnAdder(name, text) {
    bot.action(name, async(ctx)=> {
        try {
            await ctx.answerCbQuery();
            await  ctx.replyWithHTML(text)
            await  bot.telegram.sendMessage(ctx.chat.id, 'Повернутися',
            { 
                reply_markup: {
                    keyboard: [
                        [
                            {text:'До головного меню', callback_data: 'menu'},
                        ]
                    ]
                }
        })
        } catch(e) {
            console.error(e)
        }
    })
}

btnAdder('sait', text.sait)
btnAdder('contacts', text.contacts)
btnAdder('zapus', text.zapus)
btnAdder('button', text.button)





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
// send email 




bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
