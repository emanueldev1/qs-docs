import path from 'path';
export default function aliasPlugin(context, options) {
  // console.log("Loading aliases for routes: ", {
  //   '@': path.resolve(__dirname, '../'),
  //   '@/components': path.resolve(__dirname, '../components'),
  //   '@/lib': path.resolve(__dirname, '../lib'),
  //   '@/components/ui': path.resolve(__dirname, '../components/ui')
  // })
  return {
    name: 'docusaurus-plugin-aliases',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, '../'),
            '@/components': path.resolve(__dirname, '../components'),
            '@/lib': path.resolve(__dirname, '../lib'),
            '@/components/ui': path.resolve(__dirname, '../components/ui')
          }
        }
      };
    }
  };
}
