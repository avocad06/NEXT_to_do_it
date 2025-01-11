import { ReactNode } from "react";

interface IButtonProps {
    // icon 여부
    icon?: ReactNode;
    type: 'button' | 'submit' | 'reset';
    button_class?: string;
    content?: string;
    content_class?: string;
    disabled?: boolean;
}

function Button( props : IButtonProps) {
    return (
        <button type={props?.type ?? "button"} className={props.button_class} disabled={props?.disabled}>
           {props?.icon && props.icon}
           <span className={props?.content_class && props.content_class}>
                {props?.content ?? ''}
            </span> 
        </button>
    )
}

export default Button;