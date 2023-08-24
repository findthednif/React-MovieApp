import React from 'react'
import { Typography } from 'antd'

import { Consumer } from '../Context/Context'
const { Text } = Typography
export default class Genres extends React.Component {
  render() {
    const { genresIds } = this.props
    return (
      <Consumer>
        {(genres) => {
          console.log(genres)
          return genres.map((el) => {
            let genre
            if (genresIds.includes(el.id)) {
              genre = el.name
              return (
                <Text key={el.id} code>
                  {genre}
                </Text>
              )
            }
            return genre
          })
        }}
      </Consumer>
    )
  }
}
