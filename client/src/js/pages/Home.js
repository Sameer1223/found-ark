import { isRequiredArgument } from "graphql";
import React from "react";
import '../../style/App.css';
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import { useQuery } from "@apollo/client";
import { api } from "../api";

function Home() {
    // const { data, loading, error } = useQuery(api.getGuidePreviews());

    // if (loading) return <p>LOADING...</p>;
    // if (error) return <p>ERROR</p>;

    // console.log(data);

    return ( 
        <div className="App">
            <Banner img={require('../../images/HomeBanner.png')} title="LOST ARK PVP BUILD GUIDES"/>
            <div className="Title Section">CLASSES</div>
            <div className="row">
                <Card img={require('../../images/cards/Artillerist.png')} title="Artillerist"/>
                <Card img={require('../../images/cards/Bard.png')} title="Bard"/>
                <Card img={require('../../images/cards/Berserker.png')} title="Berserker"/>
                <Card img={require('../../images/cards/Deadeye.png')} title="Deadeye"/>
                <Card img={require('../../images/cards/Deathblade.png')} title="Deathblade"/>
            </div>
            <div className="row">
                <Card img={require('../../images/cards/Gunlancer.png')} title="Gunlancer"/>
                <Card img={require('../../images/cards/Gunslinger.png')} title="Gunslinger"/>
                <Card img={require('../../images/cards/Paladin.png')} title="Paladin"/>
                <Card img={require('../../images/cards/Scrapper.png')} title="Scrapper"/>
                <Card img={require('../../images/cards/Shadowhunter.png')} title="Shadowhunter"/>
            </div>
            <div className="row">
                <Card img={require('../../images/cards/Sharpshooter.png')} title="Sharpshooter"/>
                <Card img={require('../../images/cards/Sorceress.png')} title="Sorceress"/>
                <Card img={require('../../images/cards/Soulfist.png')} title="Soulfist"/>
                <Card img={require('../../images/cards/Striker.png')} title="Striker"/>
                <Card img={require('../../images/cards/Wardancer.png')} title="Wardancer"/>
            </div>
        </div> 
    );
}

export default Home;