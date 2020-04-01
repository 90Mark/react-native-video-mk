基于 react-native-video @4.4.5 修改和新增

兼容了安卓 AndroidX 新版的问题

---
使用方法：

安装

    npm install react-native-video-mk --save
    react-native link react-native-video-mk
    
    ios需要 pod install

导入

    import { MkVideo,Video } from 'react-native-video-mk'



---
js 中

    import { MkVideo,Video } from 'react-native-video-mk'

    <MkVideo
          currentIndex={0}
          videoData={{
            title: '我是第一个视频',
            url: { uri: vurl }
          }}
          // videoArray={[
          //   {
          //     title: '我是第一个视频',
          //     url: { uri: vurl }
          //   },
          //   {
          //     title: '我是第二个视频',
          //     url: { uri: vurl }
          //   }
          // ]}
          onBack={this._back}
        />

     _back = () => {
      const { navigation } = this.props
      navigation && navigation.pop()
    }


---
Video  具体使用参考 react-native-video npm官方解释

MkVideo  提供一个页面，直接push进去就好，支持多个视频切换，已处理

    常用事件
    onBack 返回按钮触发，
    nav    如果有传入，当需要返回时会自动调用nav.pop()
    videoData  单个视频资源播放
    videoArray  多个视频资源播放，可切换视频，MkVideo已处理
    currentIndex  如果是多个视频，默认从哪个开始播放，默认0
    onBuffer   远程视频缓冲时的回调
    onError   播放失败后的回调
    


---
   其他不常用的可参考源码

   有任何疑问或建议可在评论区留言
    
_by  90Mark