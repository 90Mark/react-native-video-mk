基于 react-native-video @4.4.5 修改和新增

兼容了安卓 AndroidX 新版的问题

使用方法
npm install react-native-video-mk --save
react-native link react-native-video-mk
ios需要 pod install




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
          //     title: '我是第三个视频',
          //     url: { uri: vurl }
          //   },
          //   {
          //     title: '我是第si个视频',
          //     url: { uri: vurl }
          //   }
          // ]}
          onBack={this._back}
        />



Video具体使用参考 react-native-video npm官方解释


MkVideo  提供一个页面，直接push进去就好，支持多个视频切换