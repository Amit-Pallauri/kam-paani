const port = 1010
const app = require('./app')
require('./db')

app.listen(port, ()=> console.log(`server connected to port ${port}`))