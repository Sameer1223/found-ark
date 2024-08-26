function AbilityInput(props) {
    
    function handleChange(e) {
        const { name, value } = e.target;
        props.setAbility(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="Ability Title">
            <div className="Ability__img"></div>
            <div className="Ability__name">
                <select name="abilityName" value={props.ability.abilityName} onChange={handleChange}>
                    <option key={0} value="">--</option>
                    {props.abilities.map((ability, key) => {
                        return <option key={key} value={ability}>{ability}</option>;
                    })}
                </select>   
            </div>
            <div className="Ability__lvl">
                <input type="text" className="Ability__input Form__input" name="skillLevels" value={props.ability.skillLevels} onChange={handleChange}/>
            </div>
            <div className="Ability__tripod">
                <input type="text" className="Ability__input Form__input" name="tripodRowOne" value={props.ability.tripodRowOne} onChange={handleChange}/>
            </div>
            <div className="Ability__tripod">
                <input type="text" className="Ability__input Form__input" name="tripodRowTwo" value={props.ability.tripodRowTwo} onChange={handleChange}/>
            </div>
            <div className="Ability__tripod">
                <input type="text" className="Ability__input Form__input" name="tripodRowThree" value={props.ability.tripodRowThree} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default AbilityInput;