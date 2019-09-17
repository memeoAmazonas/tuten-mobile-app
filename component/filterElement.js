import _ from 'lodash';
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

class FilterElement extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

}

<TextInput style={styles.inputBox}
           onChangeText={(value) => this.setState({value})}
           underlineColorAndroid='rgba(0,0,0,0)'
           placeholder='password'
           secureTextEntry={true}
           placeholderTextColor="#002f6c"
           ref={(input) => this.password = input}
/>

<TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText} onPress={this.saveData}>Ingresar</Text>
</TouchableOpacity>