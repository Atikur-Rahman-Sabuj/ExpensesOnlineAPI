const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'j54O6D6i46T7or45dAk6S445un4eAklA435702',
        DATABASE: 'mongodb://localhost:27017/ExpensesOnline'
    }
}

exports.get = function get(env){
    return config[env] || config.default
} 
