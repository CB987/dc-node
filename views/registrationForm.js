function registrationForm() {
    return `
    <form action="/register" method="POST">
        <label> your name:
            <input type="text" name="name">
        </label><br>
        <label> username:
            <input type="text" name="username">
        </label><br>
        <label> password:
            <input type="password" name="password">
        </label>
        <br>
    <input type="submit" value="register">
</form>
    `;
}

module.exports = registrationForm;