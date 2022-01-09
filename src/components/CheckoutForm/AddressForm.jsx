import React ,{useState,useEffect} from 'react'
import { InputLabel,Select,MenuItem,Grid,Button,Typography } from '@material-ui/core';
import { useForm,FormProvider} from 'react-hook-form';
import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';
import {Link} from 'react-router-dom';


const AddressForm = ({checkoutToken,next}) => {
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

    const fetchShippingOptions = async(checkoutTokenId, country, stateProvince = null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
        setshippingOptions(options);
        setshippingOption(options[0].id);

    };
    

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id)
    },[]);

    useEffect(() => {
        if (ShippingCountry) fetchSubdivisions(ShippingCountry);
      }, [ShippingCountry]);

    useEffect(() => {
        if (ShippingSubDivision) fetchShippingOptions(checkoutToken.id, ShippingCountry, ShippingSubDivision);
      }, [ShippingSubDivision]);

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit= {methods.handleSubmit((data)=>next({...data,ShippingCountry,ShippingSubDivision,shippingOption}))}>
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
                        <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Options</InputLabel>
                                <Select value={shippingOption} fullWidth onChange={(e) => setshippingOption(e.target.value)}>
                                    {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </Grid>
                        
                    </Grid>
                    
                    <br/>
                    
                    <div  style={{display: 'flex', justifyContent:'space-between'  }}>  
                        <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                        <Button type='submit' variant='contained ' color='primary'>Next</Button>

                    </div>


                </form>

            </FormProvider>

        </>
    );
}

export default AddressForm
