import Content from '../components/Content';

function MoodTracker() {

    return (
        <Content>
            <header>
                <h1>Select Your Mood Today</h1>
            </header>
            <div className="mood-options">
                <img src="assets/happy.png" alt="happy" className="mood-icon"/>
                <img src="assets/numb.png" alt="numb" className="mood-icon"/>
                <img src="assets/sad.png" alt="sad" className="mood-icon"/>
            </div>
        </Content>
    );
}


export default MoodTracker; 