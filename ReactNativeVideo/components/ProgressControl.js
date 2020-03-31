/**
 * Created by mark on 2020-03-31
 *
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import Slider from 'react-native-slider'

export default class ProgressControl extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { videoProgress } = this.props
    let progress = (videoProgress.allTime === 0 || videoProgress.currentTime === 0) ? 0 : parseFloat((videoProgress.currentTime / videoProgress.allTime).toFixed(2))
    const disabled = videoProgress.allTime === videoProgress.currentTime
    return (
      <View
        style={styles.bgView}>
        <Slider
          style={styles.slider}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor={'#0099ff'}
          disabled={disabled}
          value={progress}
          onValueChange={this._onValueChange}
          onSlidingComplete={this._onSlidingComplete}
        />
      </View>
    )
  }

  _onValueChange = (value) => {
    const { progressBeginClick } = this.props
    progressBeginClick && progressBeginClick()
  }

  _onSlidingComplete = (value) => {
    const { setProgress, videoProgress, progressEnd } = this.props
    let currentProgress = parseInt(videoProgress.allTime * value)
    setProgress && setProgress(currentProgress)
    progressEnd && progressEnd()
  }
}

const styles = StyleSheet.create({
  bgView: {
    width: '100%',
    height: '100%'
  },
  slider: {
    flex: 1,
    marginHorizontal: 10
  },
  track: {
    backgroundColor: '#eeeeee',
    borderRadius: 2.5,
    height: 5
  },
  thumb: {
    backgroundColor: '#eceff1',
    borderColor: '#0099ff',
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    width: 20
  },
})
