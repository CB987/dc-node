function loginForm() {
    return `
    <form action="/login" method="POST">
        <label>username:
            <input type="text" name="username">
        </label><br>
        <label>password:
            <input type="password" name="password">
        </label><br>
        <input type="submit" value="login">
    </form>
    `;
}

module.exports = loginForm;