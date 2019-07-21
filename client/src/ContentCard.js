import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    justifyContent: 'left',
    width: 600,
    height: 150,
  },
  actionarea: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'left',
  },
  media: {
    flex: '0 0 150px',
    height: 150,
  },
  metadata: {
    flex: '1 1 auto',
  },
  actions: {
    flex: '0 1 auto',
    verticalAlign: 'bottom',
  },
});

export default function ContentCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea 
          className={classes.actionarea}
          onClick={() => window.open(props.article.permalink, '_blank')}
      >
        <CardMedia
          className={classes.media}
          image={props.article.thumbnail}
          title={props.article.title}
        />
        <CardContent className={classes.metadata}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="large" color="primary">
          <AddIcon />
        </Button>
       </CardActions>
    </Card>
  );
}
