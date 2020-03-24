const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: {
                                list: [
                                    {
                                        tag: 'link',
                                        attribute: 'href',
                                        type: 'src'
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jp[e]?g|png|gif|ico)$/,
                use: ['file-loader']
            }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        new HTMLWebpackPlugin({
            template: 'public/index.html'
        })
    ]
}