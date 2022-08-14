import React from 'react';
import { Alert } from 'react-bootstrap';
const Message = ({variant, text, children}) => {
    console.log('variant',variant)
    console.log('text', text);
    return ( 
        <>
        <Alert variant={variant}>
        {
            text
            ?JSON.stringify(text.message)
            : children
            ? children
            : ''
            }
        </Alert>
        </>
     );
}
Message.defaultProps = {
    variant: "Info",
};
 
export default Message;