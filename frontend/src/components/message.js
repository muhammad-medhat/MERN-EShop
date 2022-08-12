import React from 'react';
import { Alert } from 'react-bootstrap';
const Message = ({variant, text}) => {
    console.log('vvvvvvvvvvvvvvv',variant, text);
    return ( 
        <>
        <Alert variant={variant}>
             {text.message}
        </Alert>
        </>
     );
}
Message.defaultProps = {
    variant: "Info",
};
 
export default Message;