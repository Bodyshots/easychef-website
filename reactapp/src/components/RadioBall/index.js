import './radioball.css'

function RadioBall(props) {
    return (
            <div className="radio-input">
                <div className="glass">
                    <div className="glass-inner">
                    </div>
                </div>
                <div className="selector">
                    <div className="choice">
                    <div>
                        <input type="radio" id="one" name="number-selector" value="HA" className="choice-circle" onChange={(event) => props.Change(event.target.value)}/>
                        <div className="ball"></div>
                    </div>
                    <label className="choice-name" for="one">Halal</label>
                    </div>
                    <div className="choice">
                    <div>
                        <input type="radio" id="two" name="number-selector" value="VE" className="choice-circle" onChange={(event) => props.Change(event.target.value)}/>
                        <div className="ball"></div>
                    </div>
                    <label className="choice-name">Vegan</label>
                    </div>
                </div>
            </div>
    );
}

export default RadioBall;