import React ,{useState,useEffect} from 'react'
import { InputLabel,Select,MenuItem,Grid,Button,Typography } from '@material-ui/core';
import { useForm,FormProvider} from 'react-hook-form';
import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';

const AddressForm = ({checkoutToken}) => {
    const [ShippingCountries, setShippingCountries] = useState([]);
    const [ShippingCountry,setShippingCountry]=useState('');
    const [ShippingSubDivisions, setShippingSubDivisions] = useState([]);
    const [ShippingSubDivision, setShippingSubDivision] = useState('');
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState([]);
    const methods=useForm();

    const countries = Object.entries(ShippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };
    
    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    
        setShippingSubDivisions(subdivisions);
        setShippingSubDivision(Object.keys(subdivisions)[0]);
      };
    

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id)
    },[]);

    useEffect(() => {
        if (ShippingCountry) fetchSubdivisions(ShippingCountry);
      }, [ShippingCountry]);

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit= ''>
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First name" />
                        <FormInput required name="lastName" label="Last name" />
                        <FormInput required name="address1" label="Address line 1" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="Zip / Postal code" />
                       
                        <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Country</InputLabel>
                                <Select value={ShippingCountry} fullwidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                    {countries.map((country)=>(
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Subdivision</InputLabel>
                                <Select value={ShippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
                                {Object.entries(ShippingSubDivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Options </InputLabel>
                                <select value={} fullwidth onChange={}>
                                    <MenuItem key={} value={}>
                                        select me
                                    </MenuItem>
                                </select>
                        </Grid>  */}
                        
                    </Grid>
                </form>

            </FormProvider>

        </>
    );
}

export default AddressForm
