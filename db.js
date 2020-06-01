const { connect } = require('mongoose')
const { uri, password } = process.env

connect( uri.replace('<password>', password), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(_ => console.log('database connected successfully'))
.catch(err => console.log(err))

