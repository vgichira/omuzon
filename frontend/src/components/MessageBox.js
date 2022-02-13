import Alert from 'react-bootstrap/Alert';

const MessageBox = ({ variant, children }) => (
    <Alert variant={variant || 'info'}>
        {children}
    </Alert>
);

export default MessageBox;