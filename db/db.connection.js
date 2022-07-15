const mongoose = require('mongoose');
const url = "mongodb+srv://raaj:MraVDDPpM1Vshu3C@microlandcluster.ctvqk.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
 console.log('connected to db')
}).catch((error) => {
 console.log(error)
})