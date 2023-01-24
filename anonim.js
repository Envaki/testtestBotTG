const {Markup, Composer, Scenes} = require('telegraf')

const axios = require('axios');

const TOKEN = '5869058937:AAH3kWPtduDnGYMHn6seheAUA4byi1UvWm4';
const CHAT_ID = '-1001893740855';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;


const startStep = new Composer()
startStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.userName = ctx.message.from.username
        ctx.wizard.state.firstName = ctx.message.from.first_name
        ctx.wizard.state.lastName = ctx.message.from.last_namec

       await ctx.replyWithHTML('anonim ansver \n <i>Наприклад, породисту</i>', {
            reply_markup: {
                keyboard: [
                   [
                        {text:'Назад'}
                    ]
                ]
            }
        })


       // await ctx.replyWithHTML('Яку свиню шукаєш? \n <i>Наприклад, породисту</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const tittleStep = new Composer()
tittleStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.title = ctx.message.text
        if (ctx.wizard.state.data.title=='Назад') {
            await ctx.replyWithHTML('Назад до головного меню', {
                reply_markup: {
                   keyboard: [
                       [
                            {text:'Назад'}
                        ]
                    ]
                }
            })
            return ctx.scene.leave()
        }
        await ctx.replyWithHTML('В якому місті потребуєтсья. \n <i>Наприклад, Житомир</i>', Markup.inlineKeyboard([
            [Markup.button.callback('Не важливо', 'remote')]
        ]))
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})
const cityStep = new Composer()
cityStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.city = ctx.message.text
        if (ctx.wizard.state.data.city==='Назад') {
            await ctx.replyWithHTML('Назад до головного меню', {
                reply_markup: {
                    keyboard: [
                       [
                            {text:'Назад'}
                        ]
                    ]
                }
            })
            return ctx.scene.leave()
        }
        await ctx.replyWithHTML('Вкажіть плату.\n <i>Наприклад, до 1млн але не більше 1млн</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})
cityStep.action('remote', async (ctx) => {
    try {
        ctx.wizard.state.data.city = 'Не важливо'
        if (ctx.wizard.state.data.city==='Назад') {
            await ctx.replyWithHTML('Назад до головного меню', {
                reply_markup: {
                    keyboard: [
                       [
                            {text:'Назад'}
                        ]
                    ]
                }
            })
            return ctx.scene.leave()
        }
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('Вкажіть плату.\n <i>Наприклад, до 1млн але не більше 1млн</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})
const priceStep = new Composer()
priceStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.price = ctx.message.text
        if (ctx.wizard.state.data.price==='Назад') {
            await ctx.replyWithHTML('Назад до головного меню', {
                reply_markup: {
                    keyboard: [
                       [
                            {text:'Назад'}
                        ]
                    ]
                }
            })
            return ctx.scene.leave()
        }
        await ctx.replyWithHTML('Чи потрібен досвід у свиноти? вкажіть який.\n <i>Наприклад, від 1 року свинства</i>', Markup.inlineKeyboard([
            [Markup.button.callback('Без досвіду', 'no-experiens')]
        ]))
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const expStep = new Composer()
expStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.exp = ctx.message.text
        if (ctx.wizard.state.data.exp==='Назад') {
            await ctx.replyWithHTML('Назад до головного меню', {
                reply_markup: {
                    keyboard: [
                       [
                            {text:'Назад'}
                        ]
                    ]
                }
            })
            return ctx.scene.leave()
        }
        await ctx.replyWithHTML('Які обовязки потрібно виконувати?\n <i>Наприклад, жирувати/біситись з жиру</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

expStep.action('no-experiens', async (ctx) => {
    try {
        ctx.wizard.state.data.exp = 'Без досвіду'
        if (ctx.wizard.state.data.exp==='Назад') {
            await ctx.replyWithHTML('Назад до головного меню', {
                reply_markup: {
                    keyboard: [
                       [
                            {text:'Назад'}
                        ]
                    ]
                }
            })
            return ctx.scene.leave()
        }
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('Які обовязки потрібно виконувати?\n <i>Наприклад, жирувати/біситись з жиру</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const dutyStep = new Composer()
dutyStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.duty = ctx.message.text
        if (ctx.wizard.state.data.duty==='Назад') {
            await ctx.replyWithHTML('Назад до головного меню', {
                reply_markup: {
                    keyboard: [
                       [
                            {text:'Назад'}
                        ]
                    ]
                }
            })
            return ctx.scene.leave()
        }

        await ctx.replyWithHTML('Вкажіть вимоги до свині:?\n <i>Наприклад, закінчення Філологічного</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const requStep = new Composer()
requStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.requ = ctx.message.text
        if (ctx.wizard.state.data.requ==='Назад') {
            await ctx.replyWithHTML('Назад до головного меню', {
                reply_markup: {
                    keyboard: [
                       [
                            {text:'Назад'}
                        ]
                    ]
                }
            })
            return ctx.scene.leave()
        }

        await ctx.replyWithHTML('Вкажіть умови в яких ви будете тримати свиню:?\n <i>Наприклад, говно сарай</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})
const condStep = new Composer()
condStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.cond = ctx.message.text
        const wizardData = ctx.wizard.state.data
        await ctx.replyWithHTML(`<b>Яку свиню шукаєш:</b> ${wizardData.title}\n<b>Вкажіть плату:</b>${wizardData.price}\n<b>Вкажіть місто:</b>${wizardData.city}\n<b> Потрібен досвід роботи:</b>${wizardData.exp}\n<b> Обовязки:</b>${wizardData.duty}\n<b> Умови:</b>${wizardData.requ}`)
        await ctx.replyWithHTML('Дякуюємо за заповнення!')
        axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: `Опитування Про свиню:\n <b>Яку свиню шукаєш:</b> ${wizardData.title}\n<b>Вкажіть плату:</b>${wizardData.price}\n<b>Вкажіть місто:</b>${wizardData.city}\n<b> Потрібен досвід роботи:</b>${wizardData.exp}\n<b> Обовязки:</b>${wizardData.duty}\n<b> Умови:</b>${wizardData.requ}`
        })
        return ctx.scene.leave()
    } catch (e) {
        console.log(e)
    }
})

const anonim = new Scenes.WizardScene('anonim', startStep, tittleStep,cityStep,priceStep,expStep,dutyStep,requStep,condStep)
module.exports = anonim
