import { Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';


const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const onSubmit = data => {
            console.log('form submit', data)
    };

  console.log(watch("example")); // watch input value by passing the name of it

  return (

    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

      <input defaultValue={loggedInUser.name} placeholder="Your Name" name="name" ref={register({ required: true })} />
      {errors.name && <span className="error">Name is required</span>}

      <input defaultValue={loggedInUser.email} placeholder="Your email" name="email" ref={register({ required: true })} />
      {errors.email && <span className="error">Email is required</span>}

      <input placeholder="Your Address" name="address" ref={register({ required: true })} />
      {errors.address && <span className="error">Address is required</span>}

      <input placeholder="Your Phone Number" name="phone" ref={register({ required: true })} />
      {errors.phone && <span className="error">Phone Number is required</span>}
      
      <input type="submit" />
      
    </form>
  );
};

export default Shipment;