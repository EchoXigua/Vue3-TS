import { defineComponent } from "vue";
import type { PropType } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
//对于使用 iconfont.cn 的用户，通过设置 createFromIconfontCN 方法参数对象中的 scriptUrl 字段，
//即可轻松地使用已有项目中的图标。

let scriptUrls = [`${process.env.BASE_URL}iconfont.js`]
let MyIconFont = createFromIconfontCN({
  // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  // scriptUrl: '//at.alicdn.com/t/font_2184398_zflo1kjcemp.js',
  // iconfont字体图标本地化，详见：/public/iconfont.js
  scriptUrl: scriptUrls,
});

export default defineComponent({
  name:'IconFont',
  props: {
    type:{
      type: String as PropType<string>,
      default:''
    },
    prefix: {
      type: String,
      default: 'icon-',
    }
  },
  //setup 第一个参数为收到的参数
  setup(props){
    /** 第二个有如下参数
     *  attrs: Proxy
        emit: (event, ...args) => instance.emit(event, ...args)
        expose: exposed => {…}
        slots: Proxy
     */
    return () => {
      const {type,prefix} = props
      
      //type 传值后，显示MyIconFont，没有则null
      return type ? (
        <MyIconFont 
          type={type.startsWith(prefix)? type:`${prefix}${type}`}

          />
      ):null
    }
  }
})