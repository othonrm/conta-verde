import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    collapse: {
        width: '100%',
        marginBottom: 30,
    },

    lista: {
        width: '100%',
    },

    form: {
        marginBottom: 14,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },

    input: {
        width: '100%',
        margin: '8px 0px'
    },

    btnIncluir: {
        background: 'linear-gradient(to right, #00b09b, #96c93d);',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '16px 0px',
        alignSelf: 'flex-end',
    },

    formControl: {
        minWidth: 120,
    },

    saldo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default useStyles;