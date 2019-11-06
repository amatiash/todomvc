module.exports = function(api){
    api.cache(true)

    return {
        presets: [
            ['@babel/preset-env', {modules: false}],
            '@babel/preset-react',
        ],
        plugins: [
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            ['@babel/plugin-proposal-class-properties', {loose: true}],
            '@babel/plugin-proposal-object-rest-spread',
        ],
    }
}
