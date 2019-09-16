import _ from 'lodash';
import React from 'react';
import {StyleSheet, ScrollView, View, AsyncStorage, TextInput} from 'react-native';
import ItemView from '../component/itemView';
import colors from '../assets/colors'
class Home extends React.Component {
    componentWillMount() {
        this.getData();
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: ['bookingId', 'Cliente', 'Fecha de Creación', 'Dirección', 'Precio'],
        };
        this.getData = this.getData.bind(this);
        this.filterById = this.filterById.bind(this);
    }

    getData() {
        let data = AsyncStorage.getItem('data').then((response) => {
            this.setState({data: JSON.parse(response)})
        });
    }
    filterById(id){
        console.log(_.filter(this.state.data,{bookingId : id }));
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                {this.state.data.map((item,index) =>(<View key={index} style={{backgroundColor: index % 2 === 0 ? colors.fourthColor :colors.background}}>
                        <ItemView  label='bookingId' value={item.bookingId} color={index % 2 !== 0 ? colors.fourthColor :colors.background}/>
                        <ItemView  label='Cliente' value={item.name} color={index % 2 !== 0 ? colors.fourthColor :colors.background}/>
                        <ItemView  label='Dirección' value={item.streetAddress} color={index % 2 !== 0 ? colors.fourthColor :colors.background}/>
                        <ItemView  label='Precio' value={item.bookingPrice} color={index % 2 !== 0 ? colors.fourthColor :colors.background}/>
                        <ItemView  label='Fecha de Creación' value={item.bookingTime} color={index % 2 !== 0 ? colors.fourthColor :colors.background}/>
                    </View>))
                }
            </ScrollView>
        );
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

export default Home;