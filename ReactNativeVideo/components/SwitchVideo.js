/**
 * Created by mark on 2020-03-31
 *
 */

import React, { Component } from 'react'
import {
  Image,
  StyleSheet, Text, TouchableHighlight, View
} from 'react-native'
import Images from '../res/Images'

export default class SwitchVideo extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { videoArray, currentIndex, previous, next } = this.props
    const { title } = videoArray[currentIndex]
    return (
      <View style={styles.bgView}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >{title}</Text>
        <View style={styles.pageView}>
          <TouchableHighlight onPress={previous && previous}>
            <Image
              resizeMode={'contain'}
              style={styles.img}
              source={Images.left} />
          </TouchableHighlight>
          <Text style={styles.page}>{currentIndex + 1}{'/'}{videoArray.length}</Text>
          <TouchableHighlight
            onPress={next && next}>
            <Image
              resizeMode={'contain'}
              style={styles.img}
              source={Images.right} />
          </TouchableHighlight>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  bgView: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    height: 25,
    color: '#fff',
    fontSize: 16
  },
  img: {
    width: 40,
    height: 40
  },
  pageView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  page: {
    marginHorizontal: 60,
    color: '#fff',
    fontSize: 16
  }
})
