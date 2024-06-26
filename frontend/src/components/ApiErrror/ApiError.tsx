type Props = {
    message: { [key: string]: any };
};

const ApiError = ({ message }: Props) => {
    // Check if the message is a simple error message
    const isSimpleMessage = (message: any): message is { message: string } => {
        return typeof message.message === 'string';
    };

    // Check if the message contains validation errors
    const isValidationError = (
        message: any,
    ): message is { validator_failed: { [key: string]: string[] } } => {
        return (
            message.validator_failed &&
            typeof message.validator_failed === 'object'
        );
    };

    return (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
            <div>
                {isSimpleMessage(message) ? (
                    <p>{message.message}</p>
                ) : isValidationError(message) ? (
                    Object.keys(message.validator_failed).map(
                        (field, index) => (
                            <div key={index}>
                                {message.validator_failed[field].map(
                                    (error, idx) => (
                                        <p key={idx}>{error}</p>
                                    ),
                                )}
                            </div>
                        ),
                    )
                ) : (
                    <p>Unexpected error format</p>
                )}
            </div>
        </div>
    );
};

export default ApiError;
