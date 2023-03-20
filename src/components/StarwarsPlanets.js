import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams,useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import '../App.css';
import { Grid, makeStyles } from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'name', headerName: 'Name', width:250 },
    { field: 'rotation_period', headerName: 'rotation_period', width:180 },
    { field: 'orbital_period', headerName: 'orbital_period', width:180},
    { field: 'diameter', headerName: 'diameter', width:180},
    { field: 'terrain', headerName: 'terrain', width:180},
    { field: 'surface_water', headerName: 'surface_water', width:180},
    { field: 'gravity', headerName: 'gravity', width:180},
    { field: 'population', headerName: 'population', width:180},
  ]

const useStyles = makeStyles({
    pagination: {
      display: "flex",
      justifyContent: "center",
    },
  });

const StarwarsPlanets = () => {
  const navigate = useNavigate();
//   const [data, setData] = useState([]);
  const classes = useStyles();
  const [totalPage, setTotalPage] = useState(1);
  const [muiPageNo, setMuiPageNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const count = 10;
  const [planetData, setplanetData] = useState([]);
  let { pagenum } = useParams();

  // https://swapi.dev/api/planets/?page=1
  async function getPlanets(searchData) {
    if (isNaN(pagenum)) {
        navigate("/error");
        return;
      }
    setLoading(searchData);
    const baseUrl = `https://swapi.dev/api/planets/`
    let url = baseUrl + "?page=" + pagenum 
    if (searchData) {
        url = baseUrl + "?search=" + searchData;
      }
    try {
        const resultData = await axios.get(url);
        console.log("resultData = "+ resultData.data.results);
        if (!searchData && resultData.data.count === 0) {
          setLoading(false);
          navigate("/error");
          return;
        }
        setplanetData(resultData.data.results);
        setTotalPage(Math.max(1, parseInt(resultData.data.count/ 10)));
        setMuiPageNo(parseInt(pagenum) );
        setLoading(false);
    } catch (e) {
        navigate("/error");
    }
  }

    useEffect(() => {
      getPlanets();
    }, []);

    useEffect(() => {
      getPlanets();
    }, [pagenum]);

    const handlePageChange = (event, value) => {
        navigate(`/planets/page/${value}`);
    };

    const onSearchInput = (e) => {
        setSearch(e.target.value);
    };

    const clearSearch = (e) => {
        setSearch("");
        getPlanets();
    };
    
    const keyPress = (e) => {
        if (e.keyCode === 13) {
          getPlanets(search);
        }
    };

    const ColorButton = styled(Button)(() => ({
        color: "white",
        backgroundColor: "#e6252a",
        "&:hover": {
          backgroundColor: "#e6252b",
        },
        "&:disabled": {
          color: "#3A3B3C",
        },
      }));

  console.log(planetData);
  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
    }else {
    return (
    
    <div className="App">
        <Pagination
          className={classes.pagination}
          count={totalPage}
          page={muiPageNo}
          onChange={handlePageChange}
        />
        <br></br>
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <TextField
            onInput={onSearchInput}
            onKeyDown={keyPress}
            value={search}
            id="outlined-basic"
            variant="outlined"
            label="Character Name"
            style={{ marginRight: "20px" }}
            InputProps={{
              endAdornment:
                search.length > 0 ? (
                  <IconButton aria-label="clear" onClick={clearSearch}>
                    <ClearIcon />
                  </IconButton>
                ) : null,
            }}
          />

          <ColorButton
            disabled={search.length <= 0 ? true : false}
            onClick={() => getPlanets(search)}
            variant="contained"
            size="medium"
            endIcon={<SearchIcon />}
          >
            Search
          </ColorButton>
        </Stack>
        <br></br>
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid 
            sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
                getRowId={row => row.name}
                rows={planetData}
                columns={columns}
                pageSize={12}
                checkboxSelection
                
            />
        </div>
    </div>
  );
}
}

export default StarwarsPlanets;
