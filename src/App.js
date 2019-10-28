import React, { useState, useEffect } from 'react';

import './App.css';

import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import logo from './assets/conta-verde.png';

import '../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    VerticalBarSeries,
    XAxis,
    YAxis,
    Crosshair,
} from 'react-vis';

import { ExpandMore } from '@material-ui/icons';

import useStyles from './styles';

export default function App() {

    const classes = useStyles();

    const [transacoes, setTransacoes] = useState(JSON.parse(localStorage.getItem('transacoes')) || []);

    const [showReceitas, setShowReceitas] = useState(false);
    const [showDespesas, setShowDespesas] = useState(false);

    const [crosshairValue , setCrosshairValue] = useState([]);

    const [values, setValues] = useState({
        tipo: 'receita',
        totalReceitas: 0,
        totalDespesas: 0,
        saldoAtual: 0,
    });

    useEffect(() => {
        
        localStorage.setItem('transacoes', JSON.stringify(transacoes));

        let totalReceitas = transacoes.filter(transacao => transacao.tipo === 'receita').reduce((accumuled, current) => accumuled + parseFloat(current.valor), 0);
        let totalDespesas = transacoes.filter(transacao => transacao.tipo === 'despesa').reduce((accumuled, current) => accumuled + parseFloat(current.valor), 0);

        let saldoAtual = totalReceitas - totalDespesas

        setValues(oldValues => ({
            ...oldValues,
            totalReceitas,
            totalDespesas,
            saldoAtual
        }));
        
    }, [transacoes]);

    function handleFormSubmit(e) {

        e.preventDefault();        
        
        let novaTransacao = {
            titulo: e.target.titulo.value,
            valor: parseFloat(e.target.valor.value),
            tipo: e.target.tipo.value
        };

        console.log(novaTransacao);
        
        if(novaTransacao.titulo === '' || novaTransacao.valor === 0)
        {
            return;
        }
        
        setTransacoes([ ...transacoes, novaTransacao]);

        setShowReceitas(true);
    }

    const handleChange = event => {
        setValues(oldValues => ({
          ...oldValues,
          [event.target.name]: event.target.value,
        }));
      };
    

    return (
        <Container maxWidth="sm" className="App p-3">

            <img width="160px" height="auto" src={logo} alt=""/>
            
            <p>Inclua uma transacao</p>

            <form className={classes.form} onSubmit={handleFormSubmit}>
                <TextField
                    className={classes.input}
                    label="Título da transacao"
                    name="titulo"
                />
                
                <TextField
                    className={classes.input}
                    label="Valor"
                    name="valor"
                    type="number"
                />

                <FormControl className={[ classes.formControl, classes.input ]}>
                    <InputLabel htmlFor="tipo">Tipo</InputLabel>
                        <Select value={values.tipo} onChange={handleChange} inputProps={{  name: 'tipo', id: 'tipo' }}>
                            <MenuItem value="receita">Receita</MenuItem>
                            <MenuItem value="despesa">Despesa</MenuItem>
                        </Select>
                </FormControl>
                
                <Button type="submit" variant="contained" color="primary" className={classes.btnIncluir}>
                    Incluir
                </Button>
            </form>

            <div>
                <XYPlot
                    xType="ordinal"
                    yType="linear"
                    height={(window.innerWidth *  0.1) > 250 ? (window.innerWidth *  0.1) : 250}
                    width={(window.innerWidth *  0.1) > 250 ? (window.innerWidth *  0.1) : 250}
                    onMouseLeave={() => setCrosshairValue(false)}
                >
                    {/* <VerticalBarSeries  data={data} /> */}
                    <VerticalBarSeries
                        onNearestX={d => setCrosshairValue(d)}
                        cluster="receitas"
                        color="green"
                        data={[
                            {x: 'V1', y: values.totalReceitas}
                        ]}
                    />
                    <VerticalBarSeries
                        onNearestX={d => setCrosshairValue(d)}
                        cluster="despesas"
                        color="orange"
                        data={[
                            {x: 'V1', y: values.totalDespesas}
                        ]}
                    />
                    <XAxis />
                    <YAxis />
                    {/* <VerticalGridLines /> */}
                    {/* <HorizontalGridLines /> */}
                    {crosshairValue && <Crosshair values={[crosshairValue]} />}
                </XYPlot>
            </div>

            <Card className={classes.lista}>
                <CardContent className={classes.saldo}>
                    <Typography style={{ color: values.saldoAtual < 0 ? 'red' : 'green' }}>
                        Saldo
                    </Typography>
                    <Typography style={{ marginLeft: 'auto', color: values.saldoAtual < 0 ? 'red' : 'green' }}>
                        R$ {values.saldoAtual}
                    </Typography>
                </CardContent>
            </Card>

            <ExpansionPanel onClick={() => setShowReceitas(!showReceitas)} expanded={showReceitas} className={classes.collapse}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel-receitas"
                >
                    <Typography style={{ color: 'green' }}>
                        Receitas
                    </Typography>
                    <Typography style={{ marginLeft: 'auto' }}>
                        R$ {transacoes.filter(transacao => transacao.tipo === 'receita').reduce((accumuled, current) => accumuled + parseFloat(current.valor), 0)}
                    </Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>                
                    <List className={classes.lista}>
                        {
                            transacoes.filter(transacao => transacao.tipo === 'receita').map((transacao, index) => {
                                return (
                                    <ListItem className="list-item" key={index} role={undefined} dense>
                                        <ListItemText primary={`${transacao.titulo}`} />
                                        <ListItemSecondaryAction>
                                            <ListItemText primary={`R$ ${transacao.valor}`} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })
                        }
                    </List>                
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel onClick={() => setShowDespesas(!showDespesas)} expanded={showDespesas} className={classes.collapse}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel-despesas"
                >
                    <Typography style={{ color: 'orange' }}>
                        Despesas
                    </Typography>
                    <Typography style={{ marginLeft: 'auto' }}>
                        R$ {transacoes.filter(transacao => transacao.tipo === 'despesa').reduce((accumuled, current) => accumuled + parseFloat(current.valor), 0)}
                    </Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>                
                    <List className={classes.lista}>
                        {
                            transacoes.filter(transacao => transacao.tipo === 'despesa').map((transacao, index) => {
                                return (
                                    <ListItem className="list-item" key={index} role={undefined} dense>
                                        <ListItemText primary={`${transacao.titulo}`} />
                                        <ListItemSecondaryAction>
                                            <ListItemText primary={`R$ ${transacao.valor}`} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })
                        }
                    </List>                
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </Container>
    );
}