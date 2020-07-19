import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import copy from "copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "white",
  },
  selected: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#ff7825",
  },
}));

let commentsMap = new Map();

function addOrRemoveComment(
  commentId,
  commentText,
  commentAuthor,
  count,
  setCount
) {
  let comment = commentAuthor + " : " + commentText;

  if (localStorage.getItem(commentId)) {
    localStorage.removeItem(commentId);
    commentsMap.delete(commentId);
  } else {
    localStorage.setItem(commentId, comment);
    commentsMap.set(commentId, comment);
  }

  setCount(count + 1);
}

function exportToJson() {
  const obj = Object.fromEntries(commentsMap.entries());
  console.log(obj);
  copy(JSON.stringify(obj));
}

function addToMapIfExistsInLocalStorage(commentId) {
  if (localStorage.getItem(commentId) !== null) {
    let comment = localStorage.getItem(commentId);
    commentsMap.set(commentId, comment);
  }
}

const Comments = (comments) => {
  const classes = useStyles();
  const [count, setCount] = useState(0);

  comments.comments.items.map((comment) =>
    addToMapIfExistsInLocalStorage(comment.id)
  );

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {comments.comments.items.map((comment) => (
            <Grid item xs={4} key={comment.id}>
              <Paper
                className={
                  localStorage.getItem(comment.id)
                    ? classes.selected
                    : classes.paper
                }
                onClick={() =>
                  addOrRemoveComment(
                    comment.id,
                    comment.snippet.topLevelComment.snippet.textOriginal,
                    comment.snippet.topLevelComment.snippet.authorDisplayName,
                    count,
                    setCount
                  )
                }
              >
                <b>
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </b>
                :
                {comment.snippet.topLevelComment.snippet.textOriginal
                  .split("\n")
                  .map(function (item) {
                    return (
                      <span>
                        {item}
                        <br />
                      </span>
                    );
                  })}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

      <div>Wybrane komentarze: {commentsMap.size}</div>

      <Button variant="contained" onClick={exportToJson}>
        Skopiuj do schowka
      </Button>
    </>
  );
};

export default Comments;
