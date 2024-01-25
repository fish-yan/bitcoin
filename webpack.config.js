const path = require('path');
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'], // ['包名', '包中的值']
	})
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bitcoin.js',
        library: "bitcoin",
    },
    module: {
        // 指定loader加载的规则
        rules: [
            {
                test: /\.ts$/, // 指定规则生效的文件：以ts结尾的文件
                use: 'ts-loader', // 要使用的loader
                exclude: /node-modules/ // 要排除的文件
            }
        ]
    },
    // 设置哪些文件类型可以作为模块被引用
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            "buffer": require.resolve("buffer/"),
            "stream": require.resolve("stream-browserify")
        }
    }
};