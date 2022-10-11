// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
// });
const { defineConfig } = require("@vue/cli-service");
const path = require('path')
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  devPort,
  build7z
} = require('./src/config/settings')
const date = require('dayjs')().format('YYYY_M_D')
const productionGzipExtensions = ['html', 'js', 'css', 'svg']
process.env.VUE_APP_TITLE = title || 'title'
function resolve(dir) {
  return path.join(__dirname, dir)
}
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false,
//   //sass 配置全局主题色
//   css: {
//     loaderOptions: {
//       sass: {
//         // 具体路径
//         additionalData: '@import "@/styles/variables.scss";'
//       },
//       scss: {
//         additionalData: '@import "@/styles/variables.scss";'
//       }
//     }
//   }
// });
module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave: false,
  transpileDependencies,
  configureWebpack() {
    return {
      resolve: {
        fallback: { path: require.resolve("path-browserify") },
        alias: {
          '@': resolve('src'),
          '^': resolve('src/components')
        }
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/remixIcon'))
      .add(resolve('src/colorfulIcon'))
      .end()
    config.module
      .rule('remixIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/remixIcon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'remix-icon-[name]' })
      .end()
    config.module
      .rule('colorfulIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/colorfulIcon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'colorful-icon-[name]' })
      .end()
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('cheap-source-map')
    })
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.performance.set('hints', false)
      config.devtool('none')
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    })
    config
      // .plugin('compression')
      // .use(CompressionWebpackPlugin, [
      //   {
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //     threshold: 8192,
      //     minRatio: 0.8
      //   }
      // ])
      // .end()
      if (build7z) {
        config.when(process.env.NODE_ENV === 'production', (config) => {
          config
            .plugin('fileManager')
            .use(FileManagerPlugin, [
              {
                onEnd: {
                  delete: [`./${outputDir}/video`, `./${outputDir}/data`],
                  archive: [
                    {
                      source: `./${outputDir}`,
                      destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`
                    }
                  ]
                }
              }
            ])
            .end()
        })
      }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    // requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      sass: {
        // 具体路径
        prependData: '@import "@/styles/variables.scss";'
      },
      scss: {
        prependData: '@import "@/styles/variables.scss";'
      }
    }
  },
  //跨域
  devServer: {
    // open: true,
    // host: '',
    port: 8080,
    proxy: 'http://localhost:8090'
    // client: {
    //   webSocketURL: 'ws://128.0.0.1:8080/ws',
    // },
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //  }
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8090', // 请求的接口
    //     ws: true, //  
    //     changeOrigin: true, //虚拟的站点需要更管origin
    //     secure: false, // 是否https接口
    //     pathRewrite: {
    //       '^/api':'/'//重写路径
    //       //这里的配置是正则表达式，以/api开头的将会被用用‘/api'替换掉，假如后台文档的接口是 /api/list/xxx
    //       //前端api接口写：axios.get('/api/list/xxx') ， 被处理之后实际访问的是：http://news.baidu.com/api/list/xxx
    //     },
    //     // headers: {
    //     //   referer: 'http://localhost:8090' //这里后端做了拒绝策略限制，请求头必须携带referer，否则无法访问后台
    //     // }
    //   }
    // }
  }
}

