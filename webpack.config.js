const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWeboackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');
const PurifyCSSPlugin = require("purifycss-webpack");//精简css
const path = require('path');
const glob = require('glob');

const prod = process.env.NODE_ENV === 'production';  //确认生产环境变量

let entryObj = getEntry(); //调用函数获取所有页面入口文件
let pageNameList = Object.keys(entryObj);  //所有入口页面名称，可用可不用
let proHtmlPlugin = [];
for (let i = 0; i < pageNameList.length; i++) {//得到所有页面相关html-webpack-plugin配置对象
    proHtmlPlugin.push(getHtmlPlugin(pageNameList[i]))
}

const config= {
    entry:entryObj,
    output:{
        path:resolve('./dist'),
        publicPath:prod ? '../' : '/dist/',
        filename:'js/[name].[hash:5].js',
        chunkFilename:'js/common/[id].chunk.js'
    },
    resolve:{
        alias:{
            vue:'vue/dist/vue.js',
            common:resolve('./src/APPcommon')
        }
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options: {
                    transformToRequire:{
                        video:'src',
                        source:'src',
                        img:'src',
                        image:'xlink:href'
                    },
                    loaders:{
                        scss: ExtractTextPlugin.extract({
                            fallback: 'vue-style-loader',
                            use: ['css-loader','postcss-loader', 'sass-loader']
                        }),
                    }
                },
            },
            {
                test:/\.html$/,
                loader:'html-loader?attrs=img:src img:data-src'
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                enforce:'pre',
                include:resolve('src'),
                exclude:['node_modules'],
                query:{
                    presets:['latest']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader', 'sass-loader']
                })
            },
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','postcss-loader','less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader']
                })
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: './img/[name].[ext]',
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/YDW_res/media/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/YDW_res/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors',
            minChunks: Infinity,
            minChunks:2
        }),
        new ExtractTextPlugin({
            filename:'css/[name].[hash:5].css',
            allChunks:true
        }),
        new OpenBrowserPlugin({
           url:'http://127.0.0.1:8089/dist/views/home.html#/home',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new progressBarPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "./"),
        compress: true,
        port: '8089',
        host: '127.0.0.1',
        inline: true,
        hot: false,
        noInfo: true,
        historyApiFallback: true,
    },
    performance: {
        hints: false
    },
};
config.plugins = (config.plugins || []).concat(proHtmlPlugin);

if (prod) {
    config.devtool = '#cheap-module-source-map';
    config.plugins = (config.plugins || []).concat([
        new CleanWeboackPlugin('./dist'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}else{
    config.devtool = '#cheap-module-eval-source-map';
};


function resolve(dir) {
    return path.join(__dirname,dir)
}

function getEntry() {
    var entry = {};
    //读取开发目录,并进行路径裁剪
    glob.sync('./src/APPpages/**/*.js')
        .forEach(function (name) {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口
            n = n.split('/')[1];
            eArr.push(name);
            entry[n] = eArr;
        });
    console.log(entry);
    return entry;
};

function getHtmlPlugin(name) {
    return (new HtmlWebpackPlugin({
            filename: 'views/' + name + '.html',
            template: './src/APPcommon/view/index.html',
            inject: 'body',
            chunks: ['vendors', name],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        })
    )
}


module.exports = config;