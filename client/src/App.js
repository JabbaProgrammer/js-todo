import LoginForm from "./components/LoginForm";
import TodoForm from './components/TodoForm'
import { useSelector } from 'react-redux'
import 'antd/dist/antd.css'
import './styles/App.css'
import { Switch } from "antd";
import { useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";


const App = () => {
    const isLogged = useSelector(state => state.user.logged);

    const [isDarkMode, setIsDarkMode] = useState(false);
    const { switcher, currentTheme, themes } = useThemeSwitcher();

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.Dark : themes.Light });
    }

    return (
        <div className="App">
            
            {isLogged
            ? <TodoForm/>
            : <LoginForm/>}
            {/* <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                checkedChildren={currentTheme}
                unCheckedChildren={currentTheme}
            /> */}
        </div>
    );
}

export default App;
