import _ from 'lodash';
import request from 'superagent';
import { appTuten, urlTuten, adminemail, email } from '../utils/constant';
import {AsyncStorage } from 'react-native';
import {stringify} from "qs";
const setDate = (data) => {
    const currentDate = new Date(data);
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return `${month + 1}/${date}/${year}`;
};

const filterData = (data) => {
    const result = [];
    JSON.parse(data).forEach((i) => {
        let aux = i.parentBooking;
        let tutenUSer = i.locationId.tutenUser;
        result.push({
            bookingId: i.bookingId,
            bookingTime: setDate(i.bookingTime),
            bookingPrice: i.bookingPrice,
            streetAddress: i.locationId.streetAddress,
            name: `${tutenUSer.firstName} ${tutenUSer.lastName}`,
        });
        while (aux !== null) {
            if (_.keys(aux).includes('parentBooking')) {
                tutenUSer = aux.locationId.tutenUser;
                result.push({
                    bookingId: aux.bookingId,
                    bookingTime: setDate(aux.bookingTime),
                    bookingPrice: aux.bookingPrice,
                    streetAddress: aux.locationId.streetAddress,
                    name: `${tutenUSer.firstName} ${tutenUSer.lastName}`,
                });
                aux = aux.parentBooking;
            } else {
                tutenUSer = aux.locationId.tutenUser;
                result.push({
                    bookingId: aux.bookingId,
                    bookingTime: setDate(aux.bookingTime),
                    bookingPrice: aux.bookingPrice,
                    streetAddress: aux.locationId.streetAddress,
                    name: `${tutenUSer.firstName} ${tutenUSer.lastName}`,
                });
                aux = null;
            }
        }
    });
    AsyncStorage.setItem('data', JSON.stringify(result));
};
const booking = token => {
    request
        .get(urlTuten.concat(`${email}/bookings`))
        .query({ current: true })
        .set({ Accept: 'application/json' })
        .set({ token })
        .set({ app: appTuten })
        .set({ adminemail })
        .then((response) => {
               filterData(JSON.stringify(response.body));
        })
        .catch(() => {
            alert('error consultando el detalle ');
        })
};

export default booking;
