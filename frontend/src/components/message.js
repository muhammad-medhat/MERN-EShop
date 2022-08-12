import React from 'react';
import { Alert } from 'react-bootstrap';
const Message = ({variant, text}) => {
    console.log('variant',variant)
    console.log('text', text);
    return ( 
        <>
        <Alert variant={variant}>
             {JSON.stringify(text.message)}
        </Alert>
        </>
     );
}
Message.defaultProps = {
    variant: "Info",
};
 
export default Message;