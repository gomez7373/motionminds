import Content from '../components/Content';

function Checklist() {

    return(
        <Content>
            <header>
                <h1>Today's Tasks</h1>
            </header>
            <section id="task-section">
                <ul id="taskList">
                    <li><input type="checkbox" id="task1" /> Task 1</li>
                    <li><input type="checkbox" id="task2" /> Task 2</li>
                    <li><input type="checkbox" id="task3" /> Task 3</li>
                    <li><input type="checkbox" id="task4" /> Task 4</li>
                    <li><input type="checkbox" id="task5" /> Task 5</li>
                </ul>
                <button id="saveButton">Save Progress</button>
            </section>
        </Content>
    );
    
}

export default Checklist;