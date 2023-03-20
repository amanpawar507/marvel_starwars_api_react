import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import md5 from 'blueimp-md5';
import Pagination from '@mui/material/Pagination';
import MarvelCard from './MarvelCard';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import '../App.css';

const useStyles = makeStyles({
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  pagination: {
  display: 'flex',
  justifyContent: 'center',
  },
});

const SeriesList = () => {

  const navigate = useNavigate();
  const publickey = "4c2c3e556889feca4227e746528c2407";
  const privatekey = "e022b2f7321e2ef7427cc109abfd9925d4a992c4";
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [totalPage,setTotalPage]= useState(0);
  const [muiPageNo, setMuiPageNo] = useState(0);
  const [search, setSearch] = useState('');
  const count =20;
  const [characterData, setcharacterData] = useState(undefined);
  let card = null;
  let {pagenum} = useParams();

  
async function getCharactersAPILink(searchData) {
  setLoading(true);
    if(isNaN(pagenum)){
      navigate('/error');
      return;
    }
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = `https://gateway.marvel.com:443/v1/public/series`;
  let url =
    baseUrl +
    "?limit=20" +
    "&offset=" +
    (pagenum*count) +
    "&ts=" +
    ts +
    "&apikey=" +
    publickey +
    "&hash=" +
    hash;
    if(searchData){
      url+=
    "&titleStartsWith="+
    searchData;
    }
  try {
    const resultData = await axios.get(url);
    if(!searchData && resultData.data.data.count===0){
      setLoading(false);
      navigate('/error');
      return;
    }
    setcharacterData(resultData.data.data.results);
    setTotalPage(Math.max(1,parseInt(resultData.data.data.total/20)))
    setMuiPageNo(parseInt(pagenum)+1)
    setLoading(false);
  } catch (e) {
    navigate('/error');
  }
}


  useEffect(() => {
    console.log('on load useeffect');
    getCharactersAPILink();
  }, []);


  useEffect(() => {
    console.log('on pageNumber useeffect');
    getCharactersAPILink();
  }, [pagenum]);

    const handlePageChange = (event, value) => {
    navigate(
        `/series/page/${value-1}`,
    );
  };

   const onSearchInput =(e)=>{
    setSearch(e.target.value);
  }
  
  const clearSearch=(e)=>{
    setSearch('');
    getCharactersAPILink();
  }

    const ColorButton = styled(Button)(() => ({
  color: 'white',
  backgroundColor: '#e6252a',
  '&:hover': {
    backgroundColor: '#e6252b',
  },
  '&:disabled':{
    color:'#3A3B3C'
  },
}));

  const keyPress=(e)=>{
      if(e.keyCode === 13){
         getCharactersAPILink(search)
      }
   }



    card =
      characterData &&
      characterData.map((character) => <MarvelCard key={character.id}
        id={character.id}
        imagePath={character.thumbnail.path}
        imageExtension={character.thumbnail.extension} 
        name={character.title}
        description={character.description}
        link={`/series/${character.id}`}/>);


  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div>
        <Pagination className={classes.pagination} count={totalPage} page={muiPageNo} onChange={handlePageChange}/>
        <br />
             <Stack direction="row" spacing={2} style={{justifyContent:'center'}}>
            <TextField
            onInput={onSearchInput}
            onKeyDown={keyPress}
            value={search}
            id="outlined-basic"
            variant="outlined"
            label="Series Name"
            style={{marginRight:'20px'}}
            InputProps={{endAdornment: search.length>0 ? <IconButton aria-label="clear" onClick={clearSearch}>
            <ClearIcon />
          </IconButton> : null }}
          />
          
        <ColorButton disabled={search.length<=0?true:false} onClick={()=>getCharactersAPILink(search)} variant="contained" size='medium' endIcon={<SearchIcon />}>Search</ColorButton>
      </Stack>
        <br />{
        search && characterData.length===0?
          <p>Could not find any characters starting with {search}</p>
          :
        <Grid container className={classes.grid} spacing={5}>
          {card}
        </Grid>
  }
      </div>
    );
  }
};

export default SeriesList;
