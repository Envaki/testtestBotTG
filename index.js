const { Telegraf, Markup } = require('telegraf');
require('dotenv').config()
const text = require('./const');

const bot = new Telegraf('5869058937:AAH3kWPtduDnGYMHn6seheAUA4byi1UvWm4');
// const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => {
   bot.telegram.sendMessage(ctx.chat.id, '\u{1F3E3}Головне меню',
    { 
        reply_markup: {
            inline_keyboard: [
                [
                    {text:'\u{2139}Про нас', callback_data: 'about'},
                    {text: 'sait', url: 'envaki.github.io'}  
                ],
                [
                    {text:'\u{1F404}Контакти', callback_data: 'contacts'},
                    {text:'\u{1F4DD} Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'}  
                ],
                [
                    {text:'\u{1F608}Просто кнопка', callback_data: 'button'}
                ]
            ]
        }
    })
})

function btnAdder(name, text) {
    bot.action(name, async(ctx)=> {
        try {
            await ctx.answerCbQuery();
            await  ctx.replyWithHTML(text)
            await  bot.telegram.sendMessage(ctx.chat.id, 'Повернутися',
            { 
                reply_markup: {
                    inline_keyboard: [
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
            inline_keyboard: [
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
bot.action('menu', async ctx => {
    try {
        await ctx.deleteMessage();
        await bot.telegram.sendMessage(ctx.chat.id, '\u{1F3E3}Головне меню',
        { 
            reply_markup: {
                inline_keyboard: [
                    [
                        {text:'\u{2139}Про нас', callback_data: 'about'},
                        {text: 'sait', url: 'envaki.github.io'}  
                    ],
                    [
                        {text:'\u{1F404}Контакти', callback_data: 'contacts'},
                        {text:'\u{1F4DD} Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'}  
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



/*
bot.start((ctx) => ctx.replyWithHTML('Вас вітає БОТ Житомирського ЦПМСД', Markup.inlineKeyboard([
    [Markup.button.callback('Про нас', 'btn_1'), Markup.button.callback('Стікер', 'btn_2')],
    [Markup.button.callback('Сайт', 'btn_3'), Markup.button.callback('Запис на прийом', 'btn_4')]
]))
);
bot.command('info', (ctx) => ctx.reply('команди бота: /start'));
bot.help((ctx) => ctx.reply(text.commands));

bot.action('back',(ctx) => ctx.sendMessage('Вас вітає БОТ Житомирського ЦПМСД', Markup.inlineKeyboard([
    [Markup.button.callback('Про нас', 'btn_1'), Markup.button.callback('Стікер', 'btn_2')],
    [Markup.button.callback('Сайт', 'btn_3'), Markup.button.callback('Запис на прийом', 'btn_4')]
])));
function btnAdder(name, text) {
    bot.action(name, async(ctx)=> {
        try {
            await ctx.answerCbQuery();
            await  ctx.replyWithHTML(text)
            await  bot.telegram.replyWithHTML(ctx.chat.id, {
                reply_markup: {
                    inline_keyboard: [
                        {text:'Повернутись до меню', callback_data: 'back'}
                    ]
                }
            })
        } catch(e) {
            console.error(e)
        }
    })
}

btnAdder('btn_1', text.onas)
btnAdder('btn_3', text.text)
btnAdder('btn_4', text.zapus)


bot.action('btn_2', async(ctx)=> {
    try {
        await ctx.answerCbQuery();
      await  ctx.reply('Send me a sticker')
      await bot.on('sticker', (ctx) => ctx.reply('👍'));
       disable_web_page_preview: true
    } catch(e) {
        console.error(e)
    }
})
*/


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
