function header() {
    return `
        <header>
            <h1>welcome!</h1>
        </header>
    `;
}

function footer() {
    return `
    <footer>
        <p>
            &copy; 2018 please don't judge me by this
        </p>
    </footer>
    `;
}

function logoutButton() {
    return `
    <div>
        <form action="/logout" method="POST">
            <input type="submit" value="logout">
        </form>
    </div>
    `;
}

function loginOrRegister() {
    return `
    <div>
    <a href="/login">login</a>
    |
    <a href="/register">register</a>
    </div>
    `;
}

module.exports = {
    header,
    footer,
    logoutButton,
    loginOrRegister
};