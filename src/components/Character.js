import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import {Link, useParams,useNavigate} from 'react-router-dom';
import md5 from 'blueimp-md5';
import { styled } from '@mui/material/styles';
import {
  makeStyles,
} from '@material-ui/core';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../App.css';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    top:'0px',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    height: '4px',
    backgroundColor: '#ec1d23',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    //marginRight: theme.spacing(1),
    color: '#C0C0C0',
    borderLeft: 'thin solid #393839',
    '&.Mui-selected': {
      color: 'white',
    },
  '& .MuiTabs-indicator': {
    backgroundColor: '#fff',
  },
  }),
);

const useStyles = makeStyles({
  card: {
    marginTop: '30px',
    maxWidth: 550,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
  },
  titleHead: {
    fontWeight: 'bold'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  button: {
    color: '#ec1d23',
    fontWeight: 'bold',
    fontSize: 12
  },
  hero_image: {
   "width": "100%",
  "height": "450px",
  "backgroundSize": "cover",
  "backgroundRepeat": "no-repeat",
  "backgroundPosition": "50% 50%",
    "filter": "blur(18px)",
  "WebkitFilter": "blur(8px)",
  },
  hero_text: {
    "textAlign": "left",
    "position": "absolute",
    align:'left',
    maxWidth:'50%',
    "top": "30%",
    "left": "10%",
    "color": "white",
    'h2 &':{
      textTransform: 'uppercase',
      fontFamily: 'Roboto Condensed, sans-serif',
      fontSize: 22, 
    },
    'p &': {
      display : 'block',
      fontSize: 14,
      justifyContent: 'left',
      align: 'left',
      marginLeft: 0,
      paddingLeft: 0,
      color: 'green'
    }
  },
  hero_thumb: {
    "position": "absolute",
    "top": "25%",
    "right": "10%",
    maxWidth: '200px',
    maxHeight: '200px',
    objectFit: 'cover',
    transition: 'all .15s ease-in',
    '&:hover': { 
        background:'#e6252a',
        transform: "scale3d(1.1, 1.1, 1)" ,
    },
  },
  "container": {
    "position": "relative",
    "height": "450px",
    "overflow": "hidden",
    backgroundColor: 'black',
  },
  tabs:{
    backgroundColor: '#202020',
    width:400,
    "position": "relative",
    left: '10%',
    bottom:'30px',
  },
   'tab':{
      width:100,
      height:55,
      textColor: 'white',
     
    }
});

const Character = (props) => {
  const [characterData, setcharacterData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('0');
  const classes = useStyles();
  const publickey = "4c2c3e556889feca4227e746528c2407";
  const privatekey = "e022b2f7321e2ef7427cc109abfd9925d4a992c4";
  const navigate = useNavigate();
  let {id} = useParams();


  let description = null,comics=null,series=null,stories=null,events=null;
  

  const regex = /(<([^>]+)>)/gi;
  if (characterData && characterData.description) {
    description = characterData && characterData.description.replace(regex, '');
  } else {
    description = 'No Description';
  }
  if(characterData && characterData.comics&& characterData.comics.items.length>0){
comics = characterData.comics.items.map((d,index) =>{
  const splits = d.resourceURI.split('/')
  const link = `/comics/${splits[splits.length-1]}`
return <li key={`comic-${d.name}${index}`}><Link to={link}>{d.name}</Link></li>
});
  }
  else{
    comics=[<li>Not Available</li>];
  }
  if(characterData && characterData.series&& characterData.series.items.length>0){
series = characterData.series.items.map((d,index) => {
  const splits = d.resourceURI.split('/')
  const link = `/series/${splits[splits.length-1]}`
return <li key={`series-${d.name}${index}`}><Link to={link}>{d.name}</Link></li>
});
  }
  else{
    series=[<li>Not Available</li>];
  }
    if(characterData && characterData.stories&& characterData.stories.items.length>0){
stories = characterData.stories.items.map((d,index) => <li key={`stories-${d.name}${index}`}>{d.name}</li>);
  }
  else{
    stories=[<li>Not Available</li>];
  }
    if(characterData && characterData.events && characterData.events.items.length>0){
events = characterData.events.items.map((d,index) => <li key={`events-${d.name}${index}`}>{d.name}</li>);
  }
  else{
    events=[<li>Not Available</li>];
  }

async function getCharacterAPILink() {
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${id}`;
  const url =
    baseUrl +
    "?ts=" +
    ts +
    "&apikey=" +
    publickey +
    "&hash=" +
    hash;
  try {
    const resultData = await axios.get(url);
    console.log(resultData)
    setcharacterData(resultData.data.data.results[0]);
    setLoading(false);
  } catch (e) {
    navigate('/error');
    throw "Could not retrieve Marvel API data";
  }
}
 const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  useEffect(() => {
    console.log('useEffect fired');
    getCharacterAPILink();
  }, [id]);


  const showList=()=>{
  if(value==='0'){
    return <ul>{comics}</ul>;
  }
  else if( value==="1"){
     return <ul>{stories}</ul>;
  }
  else if( value==='2'){
    return <ul>{events}</ul>;
  }
else{
  return <ul>{series}</ul>;
}
  }
  
  
  

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <Fragment>
        <div className={classes.container}>
          <div className={classes.hero_image} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .5)),url(${characterData.thumbnail.path}.${characterData.thumbnail.extension})`}}/>
          <img className={classes.hero_thumb} alt={characterData.name} src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}/>
          <div className={classes.hero_text}>
            <h1>{characterData.name}</h1>
            <p>{description}</p>
          </div> 
        </div>  
                  <StyledTabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="Character Tabs"
            className={classes.tabs}
            TabIndicatorProps={{style: {textColor:'white'}}}
          >
            <StyledTab value='0'  label="Comics" className={classes.tab}/>
            <StyledTab value='1' label="Stories" className={classes.tab}/>
            <StyledTab value='2' label="Events" className={classes.tab}/>
            <StyledTab value='3' label="Series" className={classes.tab}/>
          </StyledTabs>
        <div style={{display: 'flex', justifyContent: 'flex-start',textAlign:'left',marginLeft:'10%'}}>
        {showList()}
        </div>
        <Link to='/characters/page/0'>Back to all characters...</Link>
      </Fragment>
    
    );
  }
};

export default Character;
