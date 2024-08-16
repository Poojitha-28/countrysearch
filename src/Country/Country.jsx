import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Country.module.css"

function Country()
{
    const [data,setData] = new useState([]);
    const [filterData,setFileterData] = new useState([]);
    const debounceSearch=(value)=>{
        let timerId;
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            const filteredData = data.filter(x => x.name.common.toLowerCase().includes(value.toLowerCase()));
        
            setFileterData(filteredData);
            }, 300);

    }
    useEffect( ()=>{
        try{
        const fetchData= async () => {
            try
            {
            const data= await axios.get('https://restcountries.com/v3.1/all');
            setData(data.data);
            setFileterData(data.data);
            }catch(err)
            {
                console.error("Error fetching data:", err);
            }
        }
        fetchData();
        }       
        catch(err)
        {
            console.error(err);
        }

    },[]);
    return(
        <div>
            <input type="text" style={{position:"relative",left:"450px",marginBottom:"10px",width:"500px"}} onChange={(e)=>{debounceSearch(e.target.value)}} />
        <div style={{display:"flex",
            flexFlow:"wrap",
            gap:"30px",
        }}>
          {filterData.map((ele,idx) => ( 
            <div key={idx} className={styles.countryCard}>   <div style={{width:"100px",height:"100px"}}> 
                <img src={ele.flags.svg} alt="Text" style={{maxWidth:"100%",maxHeight:"100%",objectFit:"fill"}} />
                </div>
                <h6 style={{padding:"3px"}}>{ele.name.common}</h6>
            </div>
          ))}
        </div>
        </div>
    )
 

}

export default Country;