import { assertReturnStatement } from "@babel/types";
import dataSource from "../../dataSource";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import SavedCity from '../../components/SavedCity/SavedCity';

function SavedCities({modalOpen}: any){

    const [savedCities, setSavedCities] = useState<any[]>([]);

    const city = {
        name:"Florence",
        state:"AZ",
        description:"A small town in southern Arizona."
    }

    useEffect(()=>{
        getSavedCities();
    }, []);

    const getSavedCities = async () =>{
        let cityIds;
        try{
            let result = await dataSource.get('/savedCities', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            cityIds = (result.data[0].cities);
        }catch(e){
            console.log(e);
            console.log('bad auth')
        }

        if(cityIds){
            const fetchedCities = await Promise.all(
                cityIds.map(async (cityId: string) => {
                    let result = await dataSource.get('/city?id=' + cityId);
                    return result.data;
                })
            );
            setSavedCities(fetchedCities);
        }
    }

    const renderSavedcities = ()=>{
        if(savedCities){
            return savedCities.map((city:any, index:number) => {
                return (
                    <SavedCity key={index} id={city._id} city={city} />
                );
            });
        }
    }

    return(
        <div className={"container main-content " + modalOpen}>
            <div className="row justify-content-center">
                <div className="col">
                    <h3 className="header">Your Saved Cities.</h3>
                    {renderSavedcities()}
                </div>
            </div>
        </div>
    )
}

export default SavedCities;