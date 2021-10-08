import { useEffect, useState } from "react";

import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography, ListItemText } from "@mui/material";

function App() {
  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    (async function getTemplates() {
      const templates = await axios.get("/templates");
      setTemplateList(templates.data);
    })();
  });

  return (
    <div className="App">
      <Typography>Endpoints disponibles</Typography>
      <List>
        {templateList.map(({ adress, args, description }) => (
          <a target="_blank" rel="noreferrer" href={`${adress}${args}`}>
            <ListItem button>
              <ListItemText
                primary={description}
                secondary={`/${adress}${args}`}
              ></ListItemText>
            </ListItem>
          </a>
        ))}
      </List>
    </div>
  );
}

export default App;
