import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useState } from "react";
import "./App.css";
import yodaPng from "./images/yoda.png";


const useStyles = makeStyles({
    root: {
        width: 350,
        height: 385,
        maxWidth: "85vw",
        marginBottom: 50,
        padding: 10
    },
    input: {
        borderRadius: "10px",
        width: "300px",
        color: '#FFF',
        backgroundColor: "rgba(245, 245, 245, 0.3)",
        "&:active, &:hover, &:focus, &:not(:hover)": {
            backgroundColor: "rgba(245, 245, 245, 0.2)",
        },
        "&&": {
            marginBottom: "50px",
            marginRight: "10px",
            marginLeft: "10px",
            paddingRight: "10px",
            paddingLeft: "10px"
        }
    }
});

function App() {
    const classes = useStyles();

    // Hooks
    const [englishText, setEnglishText] = useState<any>("");
    const [yodaText, setYodaText] = useState<any>("");

    // Text Translation
    const handleChange = (e: any) => {
        const userText = e.target.value;
        setEnglishText(userText);

        const translatedText = getTranslation(userText);
        console.log(translatedText);

        // TODO: set the text in the API response
        //setYodaText(getTranslation(e.target.value));
    };

    const getTranslation = (englishText: string) => {
        return axios
            .post("/translate/yoda.json?" + new URLSearchParams({ englishText }), { englishText })
            .then((res: any) => {
                return res
            })
            .catch((err: any) => {
                return err
            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <div id="title" className="fade">
                    <img id="yoda-img" src={yodaPng} alt="Yoda" />
                    <h1 className="star-wars-font">Yoda Translator</h1>
                    <h2 className="star-wars-font">To speak like me, write your sentence below you must.</h2>
                </div>

                <div id="translation" className="fade">
                    <TextField
                        label="English"
                        id="filled-size-small"
                        placeholder="Write your sentence here"
                        value={englishText}
                        variant="filled"
                        size="small"
                        onChange={handleChange}
                        multiline
                        rows={4}
                        InputProps={{
                            className: classes.input,
                            disableUnderline: true
                        }}
                    />
                    <TextField
                        label="Yoda"
                        id="filled-size-small"
                        placeholder="(...)"
                        value={yodaText}
                        variant="filled"
                        size="small"
                        multiline
                        rows={4}
                        InputProps={{
                            className: classes.input,
                            readOnly: true,
                            disableUnderline: true
                        }}
                    />
                </div>

                {/* TODO: Add a button to execute the translation, as the API has a limit of 5 requests per hour */}

                <h2 id="footer" className="fade star-wars-font">{`© ${new Date().getFullYear()} - Eduardo Silva`}</h2>
            </header>
        </div>
    );
}

export default App;
