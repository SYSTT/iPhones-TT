import * as React from 'react';
import './Button.css';

type Props = {
    text: string;
    onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    color?: string;
    backgroundColor?: string;
    fitted?: boolean;
    marginRight?: boolean;
    disabled?: boolean;
};

function Button({
    text,
    onClick,
    color = '',
    backgroundColor = '',
    fitted,
    marginRight,
    disabled
}: Props) {
    let className = "Button";
    if (fitted) { className += " Button-fitted"; }
    return (
        <input
            type="button"
            className={className}
            onClick={onClick}
            value={text}
            style={{ color, backgroundColor, marginRight: marginRight ? '1em' : '' }}
            disabled={disabled}
        />
    );
}

export default Button;
