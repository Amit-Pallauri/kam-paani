var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI.replace("<password>", process.env.MONGO_PASS), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(function (res) {
    console.log('database is connected')
}).catch(function (err) {
    console.log(err)
})