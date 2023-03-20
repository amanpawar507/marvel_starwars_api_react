import React, {useState, useEffect} from 'react';

import {
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const useStyles = makeStyles({
    text404: {
        alignSelf: "center",
    },
    overlay: {
        width:"100%",
        height:"100%",
        backgroundImage: "url('/404/3a.gif')",
    }
});

const Error = (props) => {
    const classes = useStyles();
    const errorNo = getRndInteger(1,5);
    console.log(errorNo);
    if(errorNo==1){
        return (
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={4} className={classes.text404}>
                                    <h1>404 PAGE NOT FOUND</h1>
                                    <h2>Hydra has stolen this page from the S.H.I.E.L.D. database!</h2>
                                    <p>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
                                </Grid>
                                <Grid item xs={8}>
                                    <img src="/404/1.jpg" alt="Error"/>
                                </Grid>
                            </Grid>
                        </div>
                    );
    }
    else if(errorNo==2){
        return (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.text404}>
                                <h1>404 PAGE NOT FOUND</h1>
                                <h2>You are not worthy...</h2>
                                <p>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
                            </Grid>
                            <Grid item xs={8}>
                                <img src="/404/2.jpeg" alt="Error"/>
                            </Grid>
                        </Grid>
                    </div>
                );
    }
    else if(errorNo==3){
         return (
                        <div className={classes.overlay}>
                            <Grid container spacing={2} className={classes.rainBG}>
                                <Grid item xs={4} className={classes.text404}>
                                    <h1>404 PAGE NOT FOUND</h1>
                                    <h2>Protocol missing... Exiting program...</h2>
                                    <p>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
                                </Grid>
                                <Grid item xs={8}>
                                    <img src="/404/3.jpeg" alt="Error"/>
                                </Grid>
                            </Grid>
                        </div>
                    );
    }
    else if(errorNo==4){
            return (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.text404}>
                                <h1>404 PAGE NOT FOUND</h1>
                                <h2>Hydra is currently attacking this page!</h2>
                                <p>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
                            </Grid>
                            <Grid item xs={8}>
                                <img src="/404/4.png" alt="Error"/>
                            </Grid>
                        </Grid>
                    </div>
                );
    }
    else{
        return (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.text404}>
                                <h1>404 PAGE NOT FOUND</h1>
                                <h2>$#&%, you broke something! Just kidding...</h2>
                                <p>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
                            </Grid>
                            <Grid item xs={8}>
                                <img src="/404/5.gif" alt="Error"/>
                            </Grid>
                        </Grid>
                    </div>
                );
    }
}

export default Error;