export const setTheme = (theme) => {
    localStorage.setItem("theme", theme);
    return { type: "SWITCH_THEME", payload: theme };
};