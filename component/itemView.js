import React from 'react';
import { Text, View } from 'react-native';
import colors from '../assets/colors'

class ItemView extends React.Component {
    render() {
        return(
            <View style={{borderBottomWidth: 1,
                borderBottomColor: this.props.color,
                borderStyle: 'dashed',}}>
                <Text style={{borderColor:colors.firstColor }}>{this.props.label}: {this.props.value}</Text>
            </View>
        );
    }
}
export default ItemView;