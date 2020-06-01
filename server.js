const port = process.env.PORT || 3000
const app = require('./app')
require('./db')

app.listen(port, ()=> console.log(`server connected to port ${port}`))