import React from 'react';
import useStyles from './styles.js';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import moment from 'moment';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GoThumbsup } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';


const Post = ({ post, setCurrentID }) => {

  const classes = useStyles()

  const dispatch = useDispatch()

  return (
    <>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

        <div className={classes.overlay}>
          <Typography variant="h6"> {post.creator} </Typography>
          <Typography variant="body2" > {moment(post.createdAt).fromNow()} </Typography>
        </div>

        <div className={classes.overlay2}>
          <Button style={{ color: "white" }} size="small"
            onClick={() => setCurrentID(post._id)}>
            <FiMoreHorizontal style={{ fontSize: '25px' }} />
          </Button>
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary"> {post.tags.map((tag) => `#${tag}`)} </Typography>
        </div>

        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          {/* <Typography className={classes.title} variant="h5" gutterBottom> {post.title} </Typography> */}
          <Typography variant="body2" component="p" color="textSecondary"> {post.message} </Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
            <GoThumbsup style={{ fontSize: '20px' }} />
            &nbsp; Like &nbsp;
            {post.likeCount}
          </Button>

          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <MdDelete style={{ fontSize: '20px' }} />
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default Post