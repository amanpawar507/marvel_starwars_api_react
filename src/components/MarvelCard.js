import noImage from '../img/broken_image.jpeg';
import {Link} from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const regex = /(<([^>]+)>)/gi;

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: 470,
    marginLeft: 'auto',
    marginRight: 'auto',
    background: '#151515',
    transition: 'all .15s ease-in',
    '&:hover': { 
        background:'#e6252a',
        '& $media':{ transform: "scale3d(1.05, 1.05, 1)" },
    },
  },
  titleHead: {
    borderBottom: '1px solid white',
    fontWeight: 'bold',
    color: 'white'
  },
  cardBody:{
    color: 'white'
  },
  media: {
    height: '250px',
    width: '100%',
    transition: "transform 0.15s ease-out",
    backgroundClip: 'border-box',
    
  },
  bgHover: {
    background: '#e6252a',
    width: '100%',
    height: '4px',
   
  },
});

const MarvelCard = ({id,imagePath,imageExtension,name,description,link}) => {

  const classes = useStyles();
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
        <Card className={classes.card}>
          <CardActionArea>
            <Link to={link}>
              <CardMedia
                className={classes.media}
                component='img'
                image={
                  imagePath && imageExtension
                    ? `${imagePath}.${imageExtension}`
                    : noImage
                }
                title='character image'
              />
  <div className={classes.bgHover}></div>
              <CardContent>
                <Typography
                  className={classes.titleHead}
                  gutterBottom
                  variant='h6'
                  component='h1'
                >
                  {name.length>55?name.substring(0,55)+'...':name}
                </Typography>
                <Typography variant='body2' component='p' className={classes.cardBody}>
                  {description
                    ? description.replace(regex, '').substring(0, 120) + '...'
                    : 'No Description'}
                  <br /><br />
                  <span>More Info</span>
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

export default MarvelCard;
