/**
 * Created by mark on 2020-03-31
 *
 */

import React, { Component } from 'react'

import Video from '../../Video'

export default class videoManager extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { paused, source, style, onLoad, onBuffer, onError } = this.props
    return (
      <Video
        style={style}
        source={source}   // 可以是一个 URL 或者 本地文件
        paused={paused}
        ref={(ref) => {
          this.player = ref
        }}
        controls={false}
        repeat={false} // 重复播放
        resizeMode={'contain'}
        onBuffer={onBuffer && onBuffer}                // 远程视频缓冲时的回调
        onEnd={this._onEnd}                      // 播放完成后的回调
        onError={onError && onError}               // 播放失败后的回调
        onProgress={this._onProgress} // 进度
        onLoad={onLoad && onLoad}
        progressUpdateInterval={500} // 进度回调间隔
        allowsExternalPlayback={false}
      />
    )
  }

  _onEnd = (res) => {
    const { onEnd } = this.props
    onEnd && onEnd()
  }

  _onProgress = (res) => {
    const { onProgress } = this.props
    const { currentTime, seekableDuration } = res
    let dic = {
      currentTimeText: this._getTime(currentTime),
      allTimeText: this._getTime(seekableDuration),
      currentTime: parseInt(currentTime),
      allTime: parseInt(seekableDuration)
    }
    // console.log('1111 _onProgress', res, '\n', '播放到：', currentTime, '\n总时长', seekableDuration, dic)
    onProgress && onProgress(dic)
  }

  _getTime = (data) => {
    let h = parseInt(data / 60 / 60)
    let m = parseInt(data / 60)
    let s = parseInt(data % 60)
    h = h <= 9 ? '0' + h : h
    m = m <= 9 ? '0' + m : m
    s = s <= 9 ? '0' + s : s
    return h === '00' ? `${m}:${s}` : `${h}:${m}:${s}`
  }

  setProgress = (p) => {
    this.player && this.player.seek(p)
  }
}

