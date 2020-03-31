/**
 * Created by mark on 2020-03-31
 *
 */

import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native'
import Orientation from 'react-native-orientation-mk'

import VideoManager from './components/VideoManager'
import ControlBar from './components/ControlBar'
import SwitchVideo from './components/SwitchVideo'
import Images from './res/Images'

export default class ReactNativeVideo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showVideo: false,
      currentIndex: 0,
      btnActive: true,
      controlBarShow: false,
      videoProgress: {
        currentTime: 0,
        allTime: 0,
        currentTimeText: '00:00',
        allTimeText: '00:00'
      },
      isFull: false, // 全屏
      paused: false, // 暂停
      orientation: null // 当前屏幕方向
    }
  }

  shouldComponentUpdate () {
    return true
  }

  componentDidMount () {
    // Platform.OS === 'ios' && Orientation.unlockAllOrientations()
    this.timeOut = setTimeout(() => {
      this.setState({
        showVideo: true,
        currentIndex: this.props.currentIndex
      })
      this.timeOut && clearTimeout(this.timeOut)
    }, 500)

    Orientation.addOrientationListener(this._changeOrientation)

    Dimensions.addEventListener('change', (res) => {
      const { width, height } = res.window
      let orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT'
      this._changeOrientation(orientation)
    })
  }

  componentWillUnmount () {
    Platform.OS === 'ios' && Orientation.lockToPortrait()
    Orientation.removeOrientationListener(this._changeOrientation)
  }

  render () {
    const { showVideo, isFull, currentIndex } = this.state
    const { videoArray, videoData } = this.props
    const { width, height } = Dimensions.get('window')
    return (
      <View style={styles.bgView}>
        {isFull ? null : this._renderBack()}
        {(showVideo && (videoArray || videoData)) ?
          <View
            style={{ width: width, height: isFull ? height : width * 0.55, backgroundColor: '#000' }}>
            <TouchableWithoutFeedback
              onPress={this._videoClick}>
              {this._renderVideoView()}
            </TouchableWithoutFeedback>
          </View> :
          <View style={{
            width: width,
            height: width * 0.55,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={styles.text}>请稍等，正在加载中。。。</Text>
          </View>
        }
        {(!isFull && videoArray) ? <SwitchVideo
          videoArray={videoArray}
          currentIndex={currentIndex}
          previous={this._previous}
          next={this._next}
        /> : null}
      </View>
    )
  }

  _renderVideoView = () => {
    const { currentIndex, paused, isFull, controlBarShow, videoProgress } = this.state
    const { videoArray, videoData, onBuffer, onError } = this.props
    const { url, title } = videoArray ? videoArray[currentIndex] : videoData
    return (
      <View style={styles.widthFull}>
        <VideoManager
          ref={(r) => this.videoManager = r}
          style={styles.widthFull}
          source={url}
          onEnd={this._onEnd}
          paused={paused}
          onLoad={this._onLoad}
          onProgress={this._onProgress}
          onBuffer={onBuffer && onBuffer}
          onError={onError && onError}
        />
        <ControlBar
          controlBarShow={controlBarShow}
          start={true}
          videoArray={videoArray}
          isFull={isFull}
          paused={paused}
          title={title}
          videoProgress={videoProgress}
          progressBeginClick={this._progressBeginClick}
          progressEnd={this._progressEnd}
          startClick={this._startClick}
          fullClick={this._fullClick}
          previousClick={this._previous}
          nextClick={this._next}
          setProgress={this._setProgress}
        />
      </View>
    )
  }

  _renderBack = () => {
    return (
      <View style={styles.btnView}>
        <TouchableHighlight
          onPress={this._back}>
          <Image
            resizeMode={'contain'}
            style={styles.img}
            source={Images.close}
          />
        </TouchableHighlight>
      </View>
    )
  }

  _setProgress = (p) => {
    this.videoManager && this.videoManager.setProgress(p)
  }

  _changeOrientation = (res) => {
    this.setState({ orientation: res })
  }

  _onLoad = (res) => {
    this._setControlBarShow()
  }

  _onProgress = (res) => {
    this.setState({ videoProgress: res })
  }

  _onEnd = (res) => {
    const { currentIndex } = this.state
    const { videoArray } = this.props
    if (!videoArray || currentIndex === videoArray.length - 1) {
      this.setState({ paused: true })
      this._setControlBarShow()
    } else {
      this._next()
    }
  }

  _videoClick = () => {
    this._setControlBarShow()
  }

  _progressBeginClick = () => {
    this.barShow && clearTimeout(this.barShow)
  }

  _progressEnd = () => {
    this._setControlBarShow()
  }

  _setControlBarShow = () => {
    if (!this.state.controlBarShow) {
      this.setState({ controlBarShow: true })
    }
    this.barShow && clearTimeout(this.barShow)
    this.barShow = setTimeout(() => {
      if (!this.state.paused && this.barShow) {
        this.setState({ controlBarShow: false })
      }
    }, 3000)
  }

  _previous = () => {
    const { currentIndex } = this.state
    if (currentIndex === 0) return
    this.setState({ showVideo: false })
    this._changeVideo(currentIndex - 1)
  }

  _next = () => {
    const { currentIndex } = this.state
    const { videoArray } = this.props
    if (currentIndex === videoArray.length - 1) return
    this.setState({ showVideo: false })
    this._changeVideo(currentIndex + 1)
  }

  _changeVideo = (index) => {
    this.timeOut = setTimeout(() => {
      this.setState({
        currentIndex: index,
        btnActive: false,
        showVideo: true,
        paused: false,
        videoProgress: {
          currentTime: 0,
          allTime: 0,
          currentTimeText: '00:00',
          allTimeText: '00:00'
        },
      })
      this.timeOut && clearTimeout(this.timeOut)
    }, 500)
  }

  _back = () => {
    const { nav, onBack } = this.props
    nav && nav.pop()
    onBack && onBack()
  }

  _startClick = () => {
    const { paused, videoProgress } = this.state
    if (paused && videoProgress.allTime !== 0 && videoProgress.allTime === videoProgress.currentTime) {
      this.videoManager && this.videoManager.setProgress(0)
    }
    this.setState({ paused: !this.state.paused })
    this._setControlBarShow()
  }

  _fullClick = () => {
    const { isFull } = this.state
    this.setState({ isFull: !isFull })
    if (isFull) {
      Orientation.lockToPortrait()
      StatusBar.setHidden(false)
    } else {
      Orientation.lockToLandscape()
      StatusBar.setHidden(true)
    }
  }
}

const styles = StyleSheet.create({
  bgView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  btnView: {
    position: 'absolute',
    top: 30,
    left: 20,
    width: 33,
    height: 33
  },
  img: {
    width: 30,
    height: 30
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  text: {
    fontSize: 18,
    color: '#fff'
  },
  widthFull: {
    width: '100%',
    height: '100%'
  }
})
