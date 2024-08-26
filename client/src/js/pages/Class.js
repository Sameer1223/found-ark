import React from "react";
import Banner from "../Components/Banner";
import '../../style/Class.css';
import Preview from "../Components/Preview";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { api } from "../api";


function Class() {
    let params = useParams(); 
    let banner = require('../../images/banners/' + params.class.toLowerCase() + 'Banner.jpg');
    const [byNew, setByNew] = React.useState('Filter Unselected');
    const [byPopular, setByPopular] = React.useState('Filter Selected');
    const { data, loading, error } = useQuery(api.getGuidePreviews(params.class));

    if (loading) return null;
    if (error) return null;

    function toggleFilter(filter) {
        if(filter === "popular") {
            setByPopular("Filter Selected");
            setByNew('Filter Unselected');
        } else {
            setByPopular("Filter Unselected");
            setByNew('Filter Selected');
        }
    }

    return ( 
        <div className="App">
            <Banner img={banner} title={params.class.toUpperCase() + " BUILD GUIDES"}/>
            <div className="Title Section">BUILDS</div>
            <div className="Builds">
                <div className='FilterBar'>
                    <div className='Label'>Sort By:</div>
                    <div className={byPopular} onClick={() => toggleFilter("popular")}>Popular</div>
                    <div className={byNew} onClick={() => toggleFilter("new")}>New</div>
                </div>
                {data.guides.map((guide) => {
                    return <Preview guide={guide} key={guide._id}/>;
                })}
            </div>
        </div> 
    );
}

export default Class;