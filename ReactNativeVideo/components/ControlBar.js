/**
 * Created by mark on 2020-03-31
 *
 */

import React, { Component } from 'react'
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

import Images from '../res/Images'
import ProgressControl from './ProgressControl'

export default class ControlBar extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let { title, isFull, controlBarShow, paused, startClick, fullClick, videoProgress, previousClick, nextClick, setProgress, progressBeginClick, progressEnd } = this.props
    const { width } = Dimensions.get('window')
    return controlBarShow && (
      <View
        style={styles.bgView}>
        {isFull ? <View
          style={styles.view}>
          <TouchableWithoutFeedback
            style={styles.btn}
            onPress={fullClick}>
            <Image
              resizeMode={'contain'}
              style={styles.image}
              source={Images.left} />
          </TouchableWithoutFeedback>
          <View
            style={styles.fullTitleView}>
            <Text
              style={styles.fullTitle}
              numberOfLines={1}
            >{title}</Text>
          </View>
          <View style={styles.btn} />
        </View> : <View style={styles.topView} />}
        {paused ?
          <View style={styles.startView}>
            <TouchableWithoutFeedback
              style={styles.btn}
              onPress={startClick}>
              <Image
                resizeMode={'contain'}
                style={styles.image}
                source={Images.start} />
            </TouchableWithoutFeedback>
          </View>
          : isFull ? <View
            style={styles.checkView}>
            <TouchableWithoutFeedback
              style={styles.btn}
              onPress={previousClick}>
              <Image
                resizeMode={'contain'}
                style={styles.image}
                source={Images.left} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.btn}
              onPress={nextClick}>
              <Image
                resizeMode={'contain'}
                style={styles.image}
                source={Images.right} />
            </TouchableWithoutFeedback>
          </View> : <View style={{ flex: 1 }} />
        }
        <View style={{
          width: '100%',
          height: isFull ? 50 : 30,
          backgroundColor: '#00000080',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: isFull ? 20 : 5
        }}>
          <TouchableWithoutFeedback
            style={styles.sBtn}
            onPress={startClick}>
            <Image
              resizeMode={'contain'}
              style={styles.sImage}
              source={paused ? Images.start : Images.stop} />
          </TouchableWithoutFeedback>
          <View
            style={styles.titleView}>
            <Text
              style={styles.titleText}>{videoProgress.currentTimeText}</Text>
          </View>
          <View
            style={{ width: isFull ? width - 250 : width - 220, height: 30, backgroundColor: 'transparent' }}>
            <ProgressControl
              videoProgress={videoProgress}
              setProgress={setProgress}
              progressBeginClick={progressBeginClick}
              progressEnd={progressEnd} />
          </View>
          <View
            style={styles.titleView}>
            <Text
              style={styles.titleText}>{videoProgress.allTimeText}</Text>
          </View>
          <TouchableWithoutFeedback
            style={styles.sBtn}
            onPress={fullClick}>
            <Image
              resizeMode={'contain'}
              style={styles.sImage}
              source={isFull ? Images.exit : Images.full} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bgView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  view: {
    width: '100%',
    height: 50,
    backgroundColor: '#00000080',
    alignItems: 'center',
    paddingHorizontal: 25,
    flexDirection: 'row'
  },
  btn: {
    width: 50,
    height: 50
  },
  image: {
    width: 50,
    height: 50
  },
  sBtn: {
    width: 30,
    height: 30
  },
  sImage: {
    width: 30,
    height: 30
  },
  titleView: {
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    backgroundColor: 'transparent',
    marginHorizontal: 4,
    color: '#fff'
  },
  fullTitleView: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullTitle: {
    color: '#fff',
    fontSize: 16
  },
  topView: {
    width: '100%',
    height: 30
  },
  startView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
