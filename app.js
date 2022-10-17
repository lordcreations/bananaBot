const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios')
var JSSoup = require('jssoup').default;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false }
});

client.initialize();
client.on('message', async msg => {
    if (msg.body === '!ping') {
        msg.reply('pong');

    } else if (msg.body.startsWith('!banana')) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            axios.get('http://www.ceasa.gov.br/precos.php?TIP=1&P00=HPB&P01=1&P02=1&P03=0').then((result) => {
                const response = result.data;
                var soup = new JSSoup(response);
                const price = (soup.findAll('tr')[13].getText()).toString().split('   ')[14]
                const template = `Banana-Prata (KG) > R$${price} 🍌`
                chat.setSubject(`R$${price}  🍌`);
                msg.reply(template)
            }).catch((err) => {
                console.log(err)
            });
        } else {
            axios.get('http://www.ceasa.gov.br/precos.php?TIP=1&P00=HPB&P01=1&P02=1&P03=0').then((result) => {
                const response = result.data;
                var soup = new JSSoup(response);
                const price = (soup.findAll('tr')[13].getText()).toString().split('   ')[14]
                const template = `Banana-Prata (KG) > R$${price} 🍌`
                msg.reply(template)
            })
        }
    }
});

