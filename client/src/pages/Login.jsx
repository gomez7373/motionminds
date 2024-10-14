import Content from '../components/Content';

function Login() {
    return (
        <Content>
            <header>
                <h1>Login to MotionMinds</h1>
            </header>
            <form id="loginForm">
                <div className="input-container">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit" className="login-button">Login</button>
                <div className="forgot-password">
                    <a href="#">Forgot Password?</a>
                </div>
            </form>
        </Content>
    );
}

export default Login;