const commands = `
/start - Перезавантажити бота
/help - допомога
`
const sait = `
Відвідайте наш сайт: <a href="envaki.github.io">Сайт</a>
`
const onas = `
Комунальне підприємство «Центр первинної медико-санітарної допомоги» Житомирської міської ради створено рішенням Житомирської міської ради від 18.12.2017 №855 для надання первинної медичної допомоги.

Підприємство надає медичні послуги пацієнтам, якими подано декларації про вибір лікаря, що надає первинну медичну допомогу, лікарям підприємства.

Первинна медична допомога надається Центром відповідно до Порядку надання первинної медичної допомоги, затвердженого наказом Міністерства охорони здоров’я України від 19.03.2018 №504.

У Центрі працюють 131 лікарів загальної практики – сімейної медицини та 63 педіатрів.
Більш детально за посиланням: <a href="https://likar.center/pro-nas/">Про нас</a>
`
const contacts = `\u{1F3E5}: майдан Визволення, буд. 1, м. Житомир, Житомирська область, 10020
\u{1F4E7}: mail@likar.center
\u{260E}: 0 (800) 35 04 36
`
const zapus = `
<a href="https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html">Запис на прийом</a>
`
const button = `
<a href="https://www.youtube.com/watch?v=YrsJPTMMzss&ab_channel=KHARKIVToday">Ти кнопка</a> 
`

const {Markup, Composer, Scenes} = require('telegraf')

const startStep = new Composer()
startStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name

        await ctx.replyWithHTML('Задоволеність від 1 до 10')
        return ctx.wizard.next()
    } catch(e) {
        console.log(e)
    }
})

const titleStep = new Composer()
titleStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data.title = ctx.message.text
        await ctx.sendMessage('Ви задоволені?', Markup.inlineKeyboard([
            [
            Markup.button.callback('Так','yesButton'),Markup.button.callback('Ні','noButton')
        ]
    ]))
        return ctx.wizard.next()

    } catch(e) {
        console.log(e)
    }
})

const whyStep = new Composer()
whyStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data.why = ctx.message.text
        await ctx.sendMessage('але навіщо?', Markup.inlineKeyboard([
            [
            Markup.button.callback('Так','yesButt'),Markup.button.callback('Ні','noButt')
        ]
    ]))
        return ctx.wizard.next()

    } catch(e) {
        console.log(e)
    }
})
whyStep.action('yesButton', async (ctx) => {
    ctx.wizard.state.data.why = 'Так'

    await ctx.answerCbQuery();
    await ctx.replyWithHTML('ok \u{1F603}');

    return ctx.wizard.next()
})
const prodStep = new Composer()
prodStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.prod = 'ok \u{1F603}'
        
        await ctx.replyWithHTML('продовжуйте \n опишіть вашу задоволеність')
        return ctx.wizard.next()
    } catch(e) {
        console.log(e)
    }
})

whyStep.action('noButton', async (ctx) => {
    ctx.wizard.state.data.why = 'Ні'

    await ctx.answerCbQuery();
    await ctx.replyWithHTML('Абидня, допобачення \u{1F603}');

    return ctx.scene.leave()
})
const oputyvannya = new Scenes.WizardScene('oputyvannya', startStep, titleStep, whyStep, prodStep)

module.exports.oputyvannya = oputyvannya

module.exports.commands = commands
module.exports.sait = sait
module.exports.onas = onas
module.exports.zapus = zapus
module.exports.contacts = contacts
module.exports.button = button