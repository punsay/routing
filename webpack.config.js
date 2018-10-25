const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
entry:'./index.js',
mode:'none',
output:{
filename:'bundle.js',
path:path.resolve(__dirname,'build')
},
optimization: {
splitChunks:{
cacheGroups: {
node_vendors:{
test:/[\\/]node_modules[\\/]/,
name:'vendor',
chunks: "all"
}
}
}
},
module:{

rules:[
{
test:/\.js$/,
use:{
loader:'babel-loader'
}
},
{
test:/\.css$/,
use:['style-loader','css-loader']
}
]



},
plugins:[
new HtmlWebpackPlugin({template:'./index.html'})
]

}