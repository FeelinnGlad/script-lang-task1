import './Button.css'

const Button = () => {
    const btnClickHandler = () => {
        window.location.href = window.location.href;
    }

    return (
        <button id="button" onClick={btnClickHandler}>Новая игра</button>
    )
}

export default Button