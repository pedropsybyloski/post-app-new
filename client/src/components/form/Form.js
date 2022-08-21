import React, { useEffect } from 'react'
import useStyles from './styles.js'
import { Typography, TextField, Paper, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux'
import { createPosts, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux';

const Form = ({ currentID, setCurrentID }) => {

  const post = useSelector((state) => currentID ? state.posts.find((p) => p._id === currentID) : null)

  const [postData, setPostData] = React.useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })

  const classes = useStyles()

  const dispatch = useDispatch()

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentID) {
      dispatch(updatePost(currentID, postData))
      clear()
    } else {
      dispatch(createPosts(postData))
      clear()
    }

  }

  const clear = () => {
    setCurrentID(null)
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }

  return (
    <div>
      <>
        <Paper className={classes.Paper}>

          <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography className={classes.typography} variant="h6">
              {currentID ? 'Editar post' : 'Criar novo post'}
            </Typography>

            <TextField name="creator" variant="outlined" label="Criador" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
            <TextField name="title" variant="outlined" label="Titulo" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="Mensagem" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

            <div className={classes.fileInput}>
              <FileBase
                type="file"
                className={classes.fileInput}
                multiple={false}
                onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
              />
            </div>

            <Button className={classes.buttonSubmit} style={{ margin: "0 10px 10px 10px", backgroundColor: 'green' }} variant="contained" type="submit" size="medium" fullWidth> Postar </Button>
            {/* {currentID ? '' :
            <Button variant="contained" color="secondary" size="small" onClick={clear} style={{ margin: "0 10px 10px 10px" }} fullWidth> Deletar </Button>
            } */}
          </form>

        </Paper>
      </>
    </div>

  )
}

export default Form