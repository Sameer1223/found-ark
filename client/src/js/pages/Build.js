import React from "react";
import '../../style/Build.css';
import '../../style/App.css';
import { api } from "../api.js";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Banner from "../Components/Banner";

function Build() {
    let params = useParams(); 
    const { data, loading, error } = useQuery(api.getGuide(params.id));

    if (loading) return <p>LOADING...</p>;
    if (error) return <p>ERROR</p>;

    console.log(data);
    let banner = require('../../images/banners/' + data.guide.laClass.toLowerCase() + 'Banner.jpg');

    return (
        <div className="App">
            <Banner img={banner} title={data.guide.title}/>
            <div className="Section Title">BUILD</div>
            <div className="Boc width--1000">
                <div className="Boc__stats">
                    <div className="Border">
                        <div className="Container">
                            <img className="Image" src={require('../../images/cards/' + data.guide.laClass + '.png')}/>
                        </div>
                        <div className="Stats">
                            <div className="Stats__row Title">
                                <div>Crit:</div>
                                <div>{data.guide.crit}</div>
                            </div>
                            <div className="Stats__row Title">
                                <div>Specialization:</div>
                                <div>{data.guide.specialization}</div>
                            </div>
                            <div className="Stats__row Title">
                                <div>Domination:</div>
                                <div>{data.guide.domination}</div>
                            </div>
                            <div className="Stats__row Title">
                                <div>Swiftness:</div>
                                <div>{data.guide.swiftness}</div>
                            </div>
                            <div className="Stats__row Title">
                                <div>Endurance:</div>
                                <div>{data.guide.endurance}</div>
                            </div>
                            <div className="Stats__row Title">
                                <div>Expertise:</div>
                                <div>{data.guide.expertise}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Boc__abilities">
                    <div className="FilterBar Title">
                            <div className="Filterbar--left"></div>
                            <div className="Ability__name">Skill</div>
                            <div className="Ability__lvl">Skill Lv</div>
                            <div className="Ability__tripod">Tripod 1</div>
                            <div className="Ability__tripod">Tripod 2</div>
                            <div className="Ability__tripod">Tripod 3</div>
                    </div>
                    {data.guide.abilities.map((ability) => {
                    return (
                        <div className="Ability Title" key={ability._id}>
                            <div className="Ability__img"></div>
                            <h3 className="Ability__name">{ability.abilityName}</h3>
                            <h1 className="Ability__lvl">{ability.skillLevels}</h1>
                            <div className="Ability__tripod">{ability.tripodRowOne}</div>
                            <div className="Ability__tripod">{ability.tripodRowTwo}</div>
                            <div className="Ability__tripod">{ability.tripodRowThree}</div>
                        </div>
                    );
                })}
                </div>
            </div>
            <div className="Section Title">DESCRIPTION</div>
            <div className="width--1000 text--left">{data.guide.description}</div>
        </div>
    );
}

export default Build;