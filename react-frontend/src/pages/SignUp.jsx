import Content from '../components/Content';

function SignUp() {

    return (
        <Content>
            <header>
                <h1>Create Your Account</h1>
            </header>
            <form id="signupForm">
                <div className="input-container">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required/>
                </div>
                <div className="input-container">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" required/>
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required/>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required/>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </Content>
    );

}


export default SignUp;