import React from 'react';
import {Actions} from 'react-native-router-flux';
import { StyleSheet, Text, View,AsyncStorage, TextInput, TouchableOpacity } from 'react-native';

import login from '../actions/user';
import booking from '../actions/booking';
import colors from '../assets/colors';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    };

    saveData = async () => {
        login(this.state.email, this.state.password);
        Actions.home();
    };
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                           onChangeText={(email) => this.setState({email})}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="email"
                           placeholderTextColor="#002f6c"
                           selectionColor="#fff"
                           keyboardType="email-address"
                           onSubmitEditing={() => this.password.focus()}/>

                <TextInput style={styles.inputBox}
                           onChangeText={(password) => this.setState({password})}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder='password'
                           secureTextEntry={true}
                           placeholderTextColor="#002f6c"
                           ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.saveData}>Ingresar</Text>
                </TouchableOpacity>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.fourthColor,
        flex: 1
    },
    inputBox: {
        width: 300,
        backgroundColor: colors.background,
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

export default Login;