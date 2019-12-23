import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const MeetupContext = React.createContext({});
const UserContext = React.createContext({});

const initialState = {
    meetup: {
        title: 'Online Meetup',
        date: Date(),
        attendees: ['Bob', 'Jessy', 'Christina', 'Adam']
    },
    user: {
        name: 'Roy'
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const MeetupContextProvider = ({ user, ...props }: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState.meetup);

    return (
        <MeetupContext.Provider
            value={{
                ...state,
                handleSubscribe: () =>
                    dispatch({ type: 'subscribeUser', payload: user.name }),
                handleUnSubscribe: () =>
                    dispatch({ type: 'unSubscribeUser', payload: user.name })
            }}
        >
            {props.children}
        </MeetupContext.Provider>
    );
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'subscribeUser':
            return {
                ...state,
                attendees: [...state.attendees, action.payload],
                subscribed: true
            };
        case 'unSubscribeUser':
            return {
                ...state,
                attendees: state.attendees.filter(
                    (attendee: any) => {
                        return attendee !== action.payload;
                    }
                ),
                subscribed: false
            };
        default:
            return state;
    }
};

const App = () => {
    const classes = useStyles();
    return (
        <UserContext.Provider value={initialState.user}>
            <CssBaseline/>
            <UserContext.Consumer>
                { (user: any) => (
                    <MeetupContextProvider user={user}>
                        <MeetupContext.Consumer>
                            { (meetup: any) => (
                                <div>
                                    <AppBar position="static">
                                        <Toolbar>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit"
                                                        aria-label="menu">
                                                <MenuIcon/>
                                            </IconButton>
                                            <Typography variant="h6" className={classes.title}>
                                                News
                                            </Typography>
                                            <Button color="inherit">Login</Button>
                                        </Toolbar>
                                    </AppBar>
                                    <h1>{meetup.title}</h1>
                                    <span>{meetup.date}</span>
                                    <div>
                                        <h2>{`Attendees (${meetup.attendees.length})`}</h2>
                                        {meetup.attendees.map((attendant: any) => (
                                            <li>{attendant}</li>
                                        ))}
                                        <p>
                                            {!meetup.subscribed ? (
                                                <Button onClick={meetup.handleSubscribe}>
                                                    Subscribe
                                                </Button>
                                            ) : (
                                                <Button onClick={meetup.handleUnSubscribe}>
                                                    Unsubscribe
                                                </Button>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </MeetupContext.Consumer>
                    </MeetupContextProvider>
                )}
            </UserContext.Consumer>
        </UserContext.Provider>
    )
};

export default App;
