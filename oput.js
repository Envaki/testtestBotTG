const {Markup, Composer, Scenes} = require('telegraf')


const startStep = new Composer()
startStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.userName = ctx.message.from.username
        ctx.wizard.state.firstName = ctx.message.from.first_name
        ctx.wizard.state.lastName = ctx.message.from.last_name

        await ctx.replyWithHTML('Кого шукаєте?? \n <i>Наприклад, менеджера</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const tittleStep = new Composer()
tittleStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.title = ctx.message.text

        await ctx.replyWithHTML('Форма зайнятості. В якому місті потребуєтсья. \n <i>Наприклад, Житомир</i>', Markup.inlineKeyboard([
            [Markup.button.callback('Дистанційно', 'remote')]
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

        await ctx.replyWithHTML('Вкажіть заробітну плату.\n <i>Наприклад, до 1млн але не більше 1млн</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})
cityStep.action('remote', async (ctx) => {
    try {
        ctx.wizard.state.data.city = 'Дистанційно'
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('Вкажіть заробітну плату.\n <i>Наприклад, до 1млн але не більше 1млн</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})
const priceStep = new Composer()
priceStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.price = ctx.message.text

        await ctx.replyWithHTML('Чи потрібен досвід роботи? вкажіть який.\n <i>Наприклад, від 1 року</i>', Markup.inlineKeyboard([
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

        await ctx.replyWithHTML('Які обовязки несе посада?\n <i>Наприклад, прийняття вхідних викликів</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

expStep.action('no-experiens', async (ctx) => {
    try {
        ctx.wizard.state.data.exp = 'Без досвіду'
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('Які обовязки несе посада?\n <i>Наприклад, прийняття вхідних викликів</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const dutyStep = new Composer()
dutyStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.duty = ctx.message.text

        await ctx.replyWithHTML('Вкажіть вимоги до кандидата:?\n <i>Наприклад, Грамотність</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const requStep = new Composer()
requStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.requ = ctx.message.text

        await ctx.replyWithHTML('Вкажіть умови праці:?\n <i>Наприклад, Графік роботи 7/7 без вихідних</i>')
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
        await ctx.replyWithHTML(`<b>${wizardData.title}</b>\n<b>${wizardData.price}</b>\n<b>${wizardData.city}</b>\n\n<b> Потрібен досвід роботи:</b>${wizardData.exp}\n\n<b> Обовязки:</b>${wizardData.duty}\n\n<b> Умови:</b>${wizardData.requ}`)
        await ctx.replyWithHTML('Дякуюємо за заповнення!')
        return ctx.scene.leave()
    } catch (e) {
        console.log(e)
    }
})

const oput = new Scenes.WizardScene('oput', startStep, tittleStep,cityStep,priceStep,expStep,dutyStep,requStep,condStep)
module.exports = oput