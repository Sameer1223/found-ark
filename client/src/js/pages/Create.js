import React from "react";
import '../../style/Form.css';
import AbilityInput from "../Components/AbilityInput.js";
import { useQuery } from "@apollo/client";
import { api } from "../api";
import { useMutation } from '@apollo/client';

function Create() {
    const [title, setTitle] = React.useState("");
    const [laClass, setLaClass] = React.useState({value: "Artillerist"});
    const [gamemode, setGamemode] = React.useState({value: "TDM"});
    const [abilities, setAbilities] = React.useState([
        "Enhanced Shell",
        "Freeze Shell",
        "Buckshot",
        "Howitzer",
        "Gatling Gun",
        "Napalm Shot",
        "Howitzer",
        "Multiple Rocket Launcher",
        "Flamethrower",
        "Swing",
        "Air Raid",
        "Jump Bombardment",
        "Focus Fire",
        "Summon Turret",
        "Plasma Storm",
        "Gravity Explosion",
        "Forward Barrage",
        "Homing Barrage",
        "Energy Cannon",
        "Impregnability",
        "Energy Field",
        "Missile Barrage",
        "Heavy Turret"
    ]);

    const [crit, setCrit] = React.useState("");
    const [specialization, setSpecialization] = React.useState("");
    const [domination, setDomination] = React.useState("");
    const [swiftness, setSwiftness] = React.useState("");
    const [endurance, setEndurance] = React.useState("");
    const [expertise, setExpertise] = React.useState("");

    const [description, setDescription] = React.useState("");

    const [ability1, setAbility1] = React.useState(ability());
    const [ability2, setAbility2] = React.useState(ability());
    const [ability3, setAbility3] = React.useState(ability());
    const [ability4, setAbility4] = React.useState(ability());
    const [ability5, setAbility5] = React.useState(ability());
    const [ability6, setAbility6] = React.useState(ability());
    const [ability7, setAbility7] = React.useState(ability());
    const [ability8, setAbility8] = React.useState(ability());
    const [ability9, setAbility9] = React.useState(ability());

    const [createGuide] = useMutation(api.postGuide(
        title, 
        "Guest",
        laClass,
        gamemode,
        [
            ability1, 
            ability2, 
            ability3, 
            ability4,
            ability5,
            ability6,
            ability7,
            ability8,
            ability9
        ],
        description,
        crit,
        specialization,
        domination,
        swiftness,
        endurance,
        expertise
    ), {
    onCompleted: (data) => {
        console.log(data) // the response
    }
});

    const { data, loading, error } = useQuery(api.getClasses());
    if (loading) return null;
    if (error) return null;

    function ability() {
        return {
            abilityName: "",
            skillLevels: "",
            tripodRowOne: "",
            tripodRowTwo: "",
            tripodRowThree: ""
        };
    }

    function createClass(e) {
        e.preventDefault();
        createGuide();
        window.location.reload(false);
    }

    function onClassChange(e) {
        setLaClass({value:e.target.value});
        data.classes.map((i) => {
            if(i.className === e.target.value) {
                setAbilities(i.abilities);
                return;
            }
        });
    }

    return (
        <form className="App" onSubmit={createClass}>
            <div className="Section Title">CREATE NEW BUILD</div>
            <div className="width--1000 Title">
                Title:
                <input type="text" className="margin Form__input Ability__input" value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </div>
            <div className="Boc width--1000 Form">
                <div className="Boc__stats">
                    <div className="Border">
                        <div className="Stats">
                            <div className="Stats__row Title">
                                <div>Class:</div>
                                <select className="Dropdown Form__input" value={laClass.value} onChange={onClassChange}>
                                    <option value="Artillerist">Artillerist</option>
                                    <option value="Bard">Bard</option>
                                    <option value="Berserker">Berserker</option>
                                    <option value="Deadeye">Deadeye</option>
                                    <option value="Deathblade">Deathblade</option>
                                    <option value="Gunlancer">Gunlancer</option>
                                    <option value="Gunslinger">Gunslinger</option>
                                    <option value="Paladin">Paladin</option>
                                    <option value="Scrapper">Scrapper</option>
                                    <option value="Shadowhunter">Shadowhunter</option>
                                    <option value="Sharpshooter">Sharpshooter</option>
                                    <option value="Sorceress">Sorceress</option>
                                    <option value="Soulfist">Soulfist</option>
                                    <option value="Striker">Striker</option>
                                    <option value="Wardancer">Wardancer</option>
                                </select>
                            </div>
                            <div className="Stats__row Title">
                                <div>Gamemode:</div>
                                <select className="Dropdown Form__input" value={gamemode.value} onChange={(e) => setGamemode({value:e.target.value})}>
                                    <option value="TDM">TDM</option>
                                    <option value="D">D</option>
                                    <option value="TE">TE</option>
                                </select>
                            </div>
                            <div className="Stats__row Title">
                                <div>Crit:</div>
                                <input type="text" className="Form__input Stat__input" value={crit} onChange={(e) => setCrit(e.target.value)} required/>
                            </div>
                            <div className="Stats__row Title">
                                <div>Specialization:</div>
                                <input type="text" className="Form__input Stat__input" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required/>
                            </div>
                            <div className="Stats__row Title">
                                <div>Domination:</div>
                                <input type="text" className="Form__input Stat__input" value={domination} onChange={(e) => setDomination(e.target.value)} required/>
                            </div>
                            <div className="Stats__row Title">
                                <div>Swiftness:</div>
                                <input type="text" className="Form__input Stat__input" value={swiftness} onChange={(e) => setSwiftness(e.target.value)} required/>
                            </div>
                            <div className="Stats__row Title">
                                <div>Endurance:</div>
                                <input type="text" className="Form__input Stat__input" value={endurance} onChange={(e) => setEndurance(e.target.value)} required/>
                            </div>
                            <div className="Stats__row Title">
                                <div>Expertise:</div>
                                <input type="text" className="Form__input Stat__input" value={expertise} onChange={(e) => setExpertise(e.target.value)} required/>
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
                    <AbilityInput ability={ability1} setAbility={setAbility1} abilities={abilities}/>
                    <AbilityInput ability={ability2} setAbility={setAbility2} abilities={abilities}/>
                    <AbilityInput ability={ability3} setAbility={setAbility3} abilities={abilities}/>
                    <AbilityInput ability={ability4} setAbility={setAbility4} abilities={abilities}/>
                    <AbilityInput ability={ability5} setAbility={setAbility5} abilities={abilities}/>
                    <AbilityInput ability={ability6} setAbility={setAbility6} abilities={abilities}/>
                    <AbilityInput ability={ability7} setAbility={setAbility7} abilities={abilities}/>
                    <AbilityInput ability={ability8} setAbility={setAbility8} abilities={abilities}/>
                    <AbilityInput ability={ability9} setAbility={setAbility9} abilities={abilities}/>
                </div>
            </div>
            <div className="Section Title">DESCRIPTION</div>
            <textarea 
                type="text" 
                className="Form__textarea Form__input" 
                placeholder="" 
                value={description} 
                onKeyPress={(e)  => {if(e.key === 'Enter') e.preventDefault();}} 
                onChange={(e) => {e.preventDefault(); setDescription(e.target.value);}}
            />
            <button type="submit" className="Form__submit Form__submit--center">Submit</button>
        </form>
    );
}

export default Create;