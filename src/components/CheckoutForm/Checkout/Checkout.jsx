import React,{useState,useEffect} from 'react';
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button, CssBaseline} from '@material-ui/core';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const steps =['Shipping address','Payment details'];
const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    const [activeStep,setActiveStep]=useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData,setShippingData] = useState({});
    const classes=useStyles();
    const navigate = useNavigate();
    const [isFinished, setIsFinished] = useState(false)

    const timeout = () =>{
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }

    useEffect(()=> {
        const generateToken=async() =>{
            try{
                const token= await commerce.checkout.generateToken(cart.id,{type:'cart'});
                setCheckoutToken(token);
            }catch(error){
                navigate('/');
            }
        }

        generateToken();
    },[cart]);

    const nextstep=()=>setActiveStep((prevActiveStep)=> prevActiveStep+1);
    const backstep=()=>setActiveStep((prevActiveStep)=>prevActiveStep-1);

    const next=(data) =>{
        setShippingData(data);
        nextstep();
    }

    let Confirmation=()=> order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank You For Shopping With Us</Typography>
                <Divider classname={classes.divider} />
                <Typography variant="subtitle2"> order ref:{order.customer_reference} </Typography>
            </div>
            <br/>
            <Button component={Link} to='/' variant='outlined ' type='button' >
                Back to Home
            </Button>

        </>
    
    ):isFinished ? (
        <>
            <div>
                <Typography variant='h5'>Thank You For Shopping With Us</Typography>
                <Divider classname={classes.divider} />
            </div>
            <br/>
            <Button component={Link} to='/' variant="outlined" type="button" >
                Back to Home
            </Button>

        </>
        
    ):(
        <div classname={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error){
        <>
            <Typography varinat='h5'>Error:{error}</Typography>
        </>
    }

    const Form=()=> activeStep === 0
        ?<AddressForm checkoutToken={checkoutToken} next={next} />
        :<PaymentForm  shippingData={shippingData} checkoutToken={checkoutToken} nextstep={nextstep} backstep={backstep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />

    return (
        <>
            <CssBaseline/>
            <div className={classes.toolbar}/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant='h4' align='center'>
                        Checkout
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) =>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                        </Stepper>
                        {activeStep === steps.length ? <Confirmation/>:   checkoutToken &&  <Form/>}
                    </Paper>
                </main>

        </>
    )
}

export default Checkout
