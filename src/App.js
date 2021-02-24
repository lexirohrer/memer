import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
/* three states: the text in the bar, loading, and memes appearing*/
const [text, setText] = useState('')
const [term, setTerm] = useState('')
const [loading, setLoading] = useState(false)
const [memes, setMemes] = useState(null)

/*function that searches the internet for memes using the giphy api*/
async function getMemes(){  //async function uses await keyword
  setTerm('')
  setLoading(true)
  setMemes(null)
  let url = 'https://api.giphy.com/v1/gifs/search?'
  url += 'api_key=' + 'jhQazp87aPuMIRIZoFu2kaI2Uk5GjZRJ'
  url += '&q=' + text
  const r = await fetch(url) //await keyword only works for some commands like fetch - means wait for this line to finish running before moving on to next line
  const j = await r.json()
  setMemes(j.data)
  setLoading(false)
  setTerm(text)
  setText('')
}

console.log(memes)

// function keyPressed(e){
//   if (e.key==="Enter") {
//       getMemes()
//   }
// }
  
  return (
    <Wrap>
      <Header>
        <TextField label="Search for memes" variant="outlined" style={{width:'calc(100% - 110px)'}} 
         value={text} onChange={e=> setText(e.target.value)} autoFocus
        onKeyPress={e=> e.key == 'Enter' && getMemes()}
        />
        <Button variant="contained" color="primary" style={{height:55, marginLeft:10, width:100}}
        disabled={!text || loading}
        onClick={getMemes}> {/* this line sets onClick equal to getMemes function */}
          Search
        </Button>
      </Header>

      {loading && <LinearProgress />}

      {term && <Term>
        <span>Results for:</span>
        <strong>{term}</strong>
      </Term>}

        {memes && memes.length===0 && <Empty>
          No memes found! Try another search
        </Empty>}
        
      {memes && memes.length > 0 && <Body>
          {memes && memes.map(m=> <Meme src={m.images.fixed_width.url}/>)} 
        </Body>}
    </Wrap>
  );
}


/* don't forget the ` character here - it means multi line string */
const Term = styled.p`
  width:100%;
  text-align:center;
  & strong {
    margin-left:5px;
    font-size:16px;
  }
`

const Empty = styled.p`
width: 100%;
text-align: center;
`
const Meme = styled.img`
  max-height: 200px;
  max-width: 200px;
  min-width: 200px;
  object-fit: cover;
  margin:5px;
`
const Wrap = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  height:100vh;
`
const Header = styled.header`
  width:100%;
  min-height:50px;
  padding: 10px;
  box-sizing: border-box;
`
const Body = styled.div`
  width:100%;
  display:flex;
  justify-content: center;
  flex-wrap:wrap;
  flex:1;
  overflow:auto;
`

export default App;