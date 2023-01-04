const { Telegraf, Markup, Scenes, session } = require('telegraf');
require('dotenv').config()

const text = require('./const');

const bot = new Telegraf('5869058937:AAH3kWPtduDnGYMHn6seheAUA4byi1UvWm4');

// google 
// const TOKEN = '5869058937:AAH3kWPtduDnGYMHn6seheAUA4byi1UvWm4';

/*
const CHAT_ID = '-1001893740855';
const URI_API = `https://api.telegram.org/bot${bot}/sendMessage`;
const success = document.querySelector('.success');
const send = document.querySelector('#send');

document.querySelector('#zakazform').addEventListener('submit', function (e) {
    e.preventDefault();
    
    let message = '<b> Заявка з сайта</b> \n';

    message += `<b> Замовник:</b> ${this.name.value}` + ' ' + `${this.lastname.value}\n`;
    message += `<b> Email:</b> ${this.email.value} \n`;

    axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
    .then((res) => {
        this.name.value = "";
        this.lastname.value = "";
        this.email.value = "";
        this.select.value = "";
        this.tel.value = "";
        this.Message.value = "";
        success.style.display = 'block';
        send.style.display = 'none';
    })
    .catch((err) => {
        console.warn(err);
    })
    .finally(()=>{
        console.log('Конец');
    })
})
// google end
*/
const stage = new Scenes.Stage([text.oputyvannya])

bot.use(session())
bot.use(stage.middleware())



bot.hears('Опитування', ctx => ctx.scene.enter('oputyvannya'))

bot.command('start', async ctx => {
   // await ctx.sendMessage(ctx.chat.id, '\u{1F3E3}  Вас вітає бот ЦПМСД Житомира')
    await ctx.reply('\u{1F3E5} Cpmsd', Markup.keyboard(
        [['\u{1F3E5} Про нас','Сайт','Контакти','Опитування']]
    ).oneTime().resize()
)
      /*  reply_markup: {
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
    }) */
})



bot.hears('\u{1F3E5} Опитування', (ctx) => ctx.sendMessage('введіть текст', {
    reply_markup: {
        inline_keyboard: [
           [
                {text:'\u{2139}   Про нас' , callback_data: 'oputyvan'}
            ],
        ]
    }
}));

bot.action('oputyvan', async ctx => {
if (ctx.text === true){
    await bot.telegram.reply(ctx.chat.id, `message: ${ctx.message}`)
} else {
    await bot.telegram.reply(ctx.chat.id, `ввдіть текст`)
}

})




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
// btnAdder('button', text.button)





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
