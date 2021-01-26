import axios from 'axios';
import CountryPicker from '../components/CountryPicker/CountryPicker';

const url = 'https://covid19.mathdro.id/api';

// /------------------------Cards-------------------/

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }
    try {
        //we can say {data} instead of response.data
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        const modifiedData = { confirmed, recovered, deaths, lastUpdate }

        return modifiedData;
    } catch (error) {

    }
}



// ------------------------Charts--------------------------
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
    return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
  } catch (error) {
  return error;
 }
}


// -------------------------CountryPicker------------------------
export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}