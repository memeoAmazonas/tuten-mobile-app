import _ from 'lodash';
import React from 'react';
import {StyleSheet, ScrollView, View, AsyncStorage, TextInput, TouchableOpacity, Text, Picker} from 'react-native';
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
            price: '',
            id: '',
            typeFilter: '',
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

    filterById() {
        let comparation = 0;
        if (this.state.id === '' && this.state.price === '') {
            this.getData();
        } else {
            if (this.state.id !== '') {
                comparation = 1;
            }
            if (this.state.price !== '') {
                comparation = 2;
            }
            if (this.state.price !== '' && this.state.id !== '') {
                comparation = 3;
            }
            if (this.state.typeFilter === '' || this.state.typeFilter === '0') {
                alert('Debe seleccionar una patron de busqueda');
            } else {
                let data = _.filter(this.state.data, (item) => {
                        if (comparation === 1) {
                            if (this.state.typeFilter === "1") {
                                return (parseInt(this.state.id) > item.bookingId);
                            }
                            if (this.state.typeFilter === "2") {
                                return (parseInt(this.state.id) < item.bookingId);
                            }
                            if (this.state.typeFilter === "3") {
                                return (parseInt(this.state.id) === item.bookingId);
                            }
                        }
                        if (comparation === 2) {
                            if (this.state.typeFilter === "1") {
                                return (parseInt(this.state.price) > item.bookingPrice);
                            }
                            if (this.state.typeFilter === "2") {
                                return (parseInt(this.state.price) < item.bookingPrice);
                            }
                            if (this.state.typeFilter === "3") {
                                return (parseInt(this.state.price) === item.bookingPrice);
                            }
                        } else {
                            if (this.state.typeFilter === "1") {
                                return (parseInt(this.state.id) > item.bookingId && parseInt(this.state.price) > item.bookingPrice);
                            }
                            if (this.state.typeFilter === "2") {
                                return (parseInt(this.state.id) < item.bookingId && parseInt(this.state.price) < item.bookingPrice);
                            }
                            if (this.state.typeFilter === 3) {
                                return parseInt(this.state.id) === item.bookingId && parseInt(this.state.price) === item.bookingPrice;
                            }
                        }
                    });
                    this.setState({data: data})
            }
        }
    }

    render() {

        return (
            <ScrollView style={{backgroundColor: colors.fourthColor, flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput style={styles.inputBox}
                               onChangeText={(id) => this.setState({id})}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder='bookingId'
                               placeholderTextColor="#002f6c"
                               keyboardType={'numeric'}
                    />
                    <TextInput style={styles.inputBox}
                               onChangeText={(price) => this.setState({price})}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder='price'
                               placeholderTextColor="#002f6c"
                               keyboardType={'numeric'}
                    />

                </View>
                <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
                    <Picker
                        itemStyle={{
                            width: 150,
                            borderRadius: 50,
                            backgroundColor: '#4f83cc'
                        }}
                        style={{
                            height: 50, width: 150,
                            marginVertical: 10,
                            paddingVertical: 12,
                            borderRadius: 50,
                            backgroundColor: colors.secondColor,
                            marginRight: 10,
                            marginLeft: 5
                        }}
                        selectedValue={this.state.typeFilter}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({typeFilter: itemValue})
                        }>
                        <Picker.Item label="seleccione" value="0"/>
                        <Picker.Item label=">" value="1"/>
                        <Picker.Item label="<" value="2"/>
                        <Picker.Item label="==" value="3"/>
                    </Picker>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.filterById}>Filtrar</Text>
                    </TouchableOpacity>
                </View>
                {this.state.data.map((item, index) => (<View key={index}
                                                             style={{backgroundColor: index % 2 === 0 ? colors.background : colors.fourthColor}}>
                    <ItemView label='bookingId' value={item.bookingId}
                              color={index % 2 !== 0 ? colors.background : colors.fourthColor}/>
                    <ItemView label='Cliente' value={item.name}
                              color={index % 2 !== 0 ? colors.background : colors.fourthColor}/>
                    <ItemView label='Dirección' value={item.streetAddress}
                              color={index % 2 !== 0 ? colors.background : colors.fourthColor}/>
                    <ItemView label='Precio' value={item.bookingPrice}
                              color={index % 2 !== 0 ? colors.background : colors.fourthColor}/>
                    <ItemView label='Fecha de Creación' value={item.bookingTime}
                              color={index % 2 !== 0 ? colors.background : colors.fourthColor}/>
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
        width: 150,
        backgroundColor: colors.background,
        borderRadius: 25,
        paddingHorizontal: 16,
        marginRight: 5,
        marginLeft: 5,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 150,
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