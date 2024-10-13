import Content from '../components/Content';

function VirtualSpaces() {

    return (
        <Content>
            <header>
                <h1>Virtual Spaces</h1>
            </header>
            <div className="space-options">
                <button className="space-option">Beach</button>
                <button className="space-option">Forest</button>
                <button className="space-option">Mountain</button>
            </div>
        </Content>
    );
}


export default VirtualSpaces;