import {typography} from 'material-ui/styles';
import {grey600} from 'material-ui/styles/colors';

const styles = {
  navigation: {
    fontSize: 15,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block',
    position:'relative',
    left:'20%'

  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20
  },
  paper: {
    width: 600,
    padding: 30,
    position:'relative',
    left:'20%'
  },
  paper2:{
    padding: 30

  },
  clear: {
    clear: 'both'
  },
  forms:{
    width: 500
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  }
};


export default styles;
